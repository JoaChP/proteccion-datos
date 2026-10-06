import unittest
from itertools import product
from unittest.mock import patch
from app.main import (answer_message, send_chatbot_message, ChatMessage, GUIDANCE,
                      SIMULATIONS, EDUCATION_OPTIONS, EDUCATION_TOPICS, ASSESSMENT, SESSIONS, LEARNING_GROUPS)
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
                self.assertEqual(result.feedback['correct'], 'ABC'[index] == LEARNING_CHECKS[key]['correct'])
                self.assertEqual(result.feedback['selected'], question.suggestions[index])
                self.assertIn(result.feedback['answer'], result.reply)
                self.assertIn('PARA PROTEGER TUS DATOS', result.reply)
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

    def test_serverless_simulation_survives_each_cold_start(self):
        history = []
        def send(message):
            SESSIONS.clear()
            result = send_chatbot_message(ChatMessage(message=message, session_id='same-client', history=history.copy()))
            history.append(message)
            self.assertEqual(SESSIONS, {})
            return result
        send('🎯 Hacer una simulación')
        result = send(next(iter(SIMULATIONS.values()))['label'])
        for index in range(4):
            self.assertEqual(result.simulation['current'], index + 1)
            result = send(result.suggestions[0])
            self.assertIsInstance(result.feedback['correct'], bool)
            result = send(result.suggestions[0])
        self.assertEqual(result.simulation['phase'], 'complete')

    def test_serverless_assessment_survives_each_cold_start(self):
        history = ['Evaluar mis prácticas digitales']
        result = send_chatbot_message(ChatMessage(message='▶️ Iniciar evaluación', session_id='cold', history=history.copy()))
        history.append('▶️ Iniciar evaluación')
        for index in range(len(ASSESSMENT)):
            SESSIONS.clear()
            self.assertEqual(result.progress['current'], index + 1)
            choice = result.suggestions[0]
            result = send_chatbot_message(ChatMessage(message=choice, session_id='cold', history=history.copy()))
            history.append(choice)
        self.assertEqual(len(result.areas), 5)
        self.assertIn('BAJO', result.reply)
        self.assertEqual(SESSIONS, {})

    def test_every_guidance_branch_has_a_result_and_exit(self):
        for topic in GUIDANCE.values():
            for choice in topic['options']:
                answer_message('Orientación ante una situación', 'test')
                question = answer_message(topic['label'], 'test')
                self.assertIn(choice, question.suggestions)
                follow_up = answer_message(choice, 'test')
                self.assertEqual(SESSIONS['test']['mode'], 'guidance-context')
                self.assertEqual(follow_up.progress, {'current': 2, 'total': 2})
                for context in follow_up.suggestions[:3]:
                    answer_message('Orientación ante una situación', 'test')
                    answer_message(topic['label'], 'test')
                    answer_message(choice, 'test')
                    result = answer_message(context, 'test')
                    self.assertIn('PRIMERO', result.reply)
                    self.assertIn('DESPUÉS', result.reply)
                    self.assertTrue(result.sources)
                    self.assertNotIn('test', SESSIONS)
                self.assertGreater(len(result.reply), 100)
                self.assertNotIn('test', SESSIONS)
                self.assertIn('🏠 Volver al inicio', result.suggestions)

    def test_every_simulation_choice_produces_feedback(self):
        for scenario in SIMULATIONS.values():
            for choices in product(range(3), repeat=4):
                answer_message('🎯 Hacer una simulación', 'test')
                result = answer_message(scenario['label'], 'test')
                for index, selected in enumerate(choices):
                    self.assertEqual(result.simulation['current'], index + 1)
                    result = answer_message(result.suggestions[selected], 'test')
                    self.assertIn(scenario['steps'][index]['explanations'][selected], result.reply)
                    self.assertEqual(result.simulation['phase'], 'feedback')
                    self.assertEqual(result.feedback['correct'], 'ABC'[selected] == scenario['steps'][index]['correct'])
                    self.assertIn('RESPUESTA CORRECTA Y POR QUÉ', result.reply)
                    self.assertIn(result.feedback['answer'], result.reply)
                    self.assertIn(result.feedback['support'], result.reply)
                    result = answer_message(result.suggestions[0], 'test')
                self.assertEqual(result.simulation['phase'], 'complete')
                expected = sum('ABC'[choice] == stage['correct'] for choice, stage in zip(choices, scenario['steps']))
                self.assertIn(f'{expected} de 4', result.reply)
                self.assertIn('TU SIGUIENTE ACCIÓN', result.reply)
                self.assertNotIn('test', SESSIONS)

    def test_simulation_rejects_stale_options_and_early_continue(self):
        scenario = next(iter(SIMULATIONS.values()))
        answer_message('🎯 Hacer una simulación', 'test')
        answer_message(scenario['label'], 'test')
        result = answer_message('Continuar al siguiente paso', 'test')
        self.assertEqual(result.simulation['phase'], 'decision')
        self.assertEqual(len(SESSIONS['test']['decisions']), 0)
        answer_message(result.suggestions[0], 'test')
        answer_message('Continuar al siguiente paso', 'test')
        result = answer_message(scenario['steps'][0]['options'][0], 'test')
        self.assertEqual(result.simulation['current'], 2)
        self.assertEqual(len(SESSIONS['test']['decisions']), 1)

    def test_hint_preserves_stage_and_does_not_count_as_decision(self):
        scenario = next(iter(SIMULATIONS.values()))
        answer_message('🎯 Hacer una simulación', 'test')
        answer_message(scenario['label'], 'test')
        result = answer_message('Necesito una pista', 'test')
        self.assertIn('PISTA PARA DECIDIR', result.reply)
        self.assertEqual(result.simulation['current'], 1)
        self.assertEqual(SESSIONS['test']['decisions'], [])
        self.assertEqual(result.suggestions[:3], scenario['steps'][0]['options'])

    def test_learning_groups_cover_all_topics_without_duplicates(self):
        grouped = [key for values in LEARNING_GROUPS.values() for key in values]
        self.assertEqual(len(grouped), len(set(grouped)))
        self.assertEqual(set(grouped), set(EDUCATION_TOPICS))
        for label, keys in LEARNING_GROUPS.items():
            answer_message('Educación y simulación', 'test')
            result = answer_message(label, 'test')
            self.assertEqual(result.suggestions[:len(keys)], [EDUCATION_TOPICS[key]['label'] for key in keys])

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

    def test_personal_data_request_has_three_contextual_plans(self):
        for index in range(3):
            result = answer_message('Me solicitaron datos personales', 'test')
            result = answer_message(result.suggestions[index], 'test')
            self.assertIn('PRIMERO', result.reply)
            self.assertIn('artículo', result.reply)
            self.assertTrue(result.sources)
            self.assertNotIn('test', SESSIONS)

    def test_repeat_simulation_starts_a_fresh_attempt(self):
        scenario = next(iter(SIMULATIONS.values()))
        SESSIONS['test'] = {'mode': 'simulation-feedback'}
        result = answer_message(f"Repetir: {scenario['label']}", 'test')
        self.assertEqual(result.simulation['current'], 1)
        self.assertEqual(SESSIONS['test']['decisions'], [])
        self.assertEqual(result.suggestions[:3], scenario['steps'][0]['options'])

    def test_restart_can_exit_every_active_state(self):
        for mode in ['guidance-menu', 'guidance-question', 'guidance-context', 'learning-content', 'learning-check', 'education-menu', 'simulation-menu', 'simulation-answer', 'simulation-feedback', 'assessment']:
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
