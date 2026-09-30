import unittest
from unittest.mock import patch
from app.main import (answer_message, send_chatbot_message, ChatMessage, GUIDANCE,
                      SIMULATIONS, EDUCATION_OPTIONS, EDUCATION_TOPICS, ASSESSMENT, SESSIONS)
from app.learning_content import LEARNING_CHECKS, assessment_report

class GuidedChatTests(unittest.TestCase):
    def test_learning_checks_cover_all_topics_and_choices(self):
        self.assertEqual(set(EDUCATION_TOPICS), set(LEARNING_CHECKS))
        for key, topic in EDUCATION_TOPICS.items():
            for index in range(3):
                answer_message('Educación y simulación', 'test')
                content = answer_message(topic['label'], 'test')
                self.assertIn('Comprobar lo aprendido', content.suggestions)
                question = answer_message('Comprobar lo aprendido', 'test')
                result = answer_message(question.suggestions[index], 'test')
                self.assertIn(LEARNING_CHECKS[key]['explanation'], result.reply)
                self.assertNotIn('test', SESSIONS)

    def test_recommendations_follow_areas_not_only_total(self):
        passwords = ['C' if q[0] == 'Contraseñas' else 'A' for q in ASSESSMENT]
        privacy = ['C' if q[0] == 'Redes sociales' else 'A' for q in ASSESSMENT]
        first = assessment_report(ASSESSMENT, passwords)
        second = assessment_report(ASSESSMENT, privacy)
        self.assertEqual(first[0]['area'], 'Contraseñas')
        self.assertEqual(second[0]['area'], 'Redes sociales')
        self.assertNotEqual(first[0]['action'], second[0]['action'])
        self.assertTrue(all(a['percentage'] == 0 for a in first[1:]))

    def test_stale_learning_choice_does_not_advance(self):
        answer_message('Educación y simulación', 'test')
        answer_message(EDUCATION_OPTIONS[0], 'test')
        answer_message('Comprobar lo aprendido', 'test')
        result = answer_message('C) Una alternativa de otra pregunta', 'test')
        self.assertEqual(SESSIONS['test']['mode'], 'learning-check')
        self.assertEqual(result.suggestions, LEARNING_CHECKS['phishing']['options'])

    def setUp(self):
        SESSIONS.clear()

    def test_every_guidance_branch_has_a_result_and_exit(self):
        for topic in GUIDANCE.values():
            for choice in topic['options']:
                answer_message('Orientación ante una situación', 'test')
                question = answer_message(topic['label'], 'test')
                self.assertIn(choice, question.suggestions)
                result = answer_message(choice, 'test')
                self.assertGreater(len(result.reply), 100)
                self.assertNotIn('test', SESSIONS)
                self.assertIn('🏠 Volver al inicio', result.suggestions)

    def test_every_simulation_choice_produces_feedback(self):
        for scenario in SIMULATIONS.values():
            for choice in scenario['options']:
                answer_message('🎯 Hacer una simulación', 'test')
                answer_message(scenario['label'], 'test')
                result = answer_message(choice, 'test')
                self.assertGreater(len(result.reply), 100)
                self.assertNotIn('test', SESSIONS)

    def test_switch_module_from_education_content(self):
        for topic in EDUCATION_OPTIONS:
            answer_message('Educación y simulación', 'test')
            answer_message(topic, 'test')
            result = answer_message('🎯 Hacer una simulación', 'test')
            self.assertEqual(SESSIONS['test']['mode'], 'simulation-menu')
            self.assertIn(next(iter(SIMULATIONS.values()))['label'], result.suggestions)

    def test_complete_assessment_at_all_three_levels(self):
        for choice, level in [(0, 'BAJO'), (1, 'MODERADO'), (2, 'ALTO')]:
            answer_message('Evaluar mis prácticas digitales', 'test')
            result = answer_message('▶️ Iniciar evaluación', 'test')
            for index in range(len(ASSESSMENT)):
                self.assertEqual(result.progress['current'], index + 1)
                result = answer_message(result.suggestions[choice], 'test')
            self.assertIn(level, result.reply)
            self.assertNotIn('test', SESSIONS)

    def test_restart_can_exit_every_active_state(self):
        for mode in ['guidance-menu', 'guidance-question', 'education-menu', 'simulation-menu', 'simulation-answer', 'assessment']:
            SESSIONS['test'] = {'mode': mode}
            result = answer_message('🏠 Volver al inicio', 'test')
            self.assertNotIn('test', SESSIONS)
            self.assertEqual(len(result.suggestions), 3)

    def test_sources_survive_translation(self):
        with patch('app.main.translate_chat_text', side_effect=lambda text, lang: text):
            result = send_chatbot_message(ChatMessage(message='📖 ¿Qué es la Ley N.º 8968?', session_id='test', language='en'))
        self.assertTrue(any('8968' in source['title'] for source in result.sources))

if __name__ == '__main__':
    unittest.main()
