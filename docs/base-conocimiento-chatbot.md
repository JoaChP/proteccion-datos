# Chatbot guiado y base inicial

Implementación basada en la base inicial, el capítulo II (marco teórico) y el documento del Objetivo 1 facilitados por el autor el 30 de septiembre de 2026. La interfaz funciona exclusivamente mediante selección de opciones; no solicita texto libre ni documentos personales.

## Recorridos

- **Orientación y asistencia:** fraude, phishing, acceso no autorizado, uso indebido de datos e identidad. Incluye un acceso a derechos y orientación institucional (PRODHAB, OIJ y CSIRT-CR).
- **Educación y simulación:** quince temas educativos, cada uno con una pregunta de comprensión de tres alternativas y explicación del criterio. Cuatro simulaciones ofrecen retroalimentación: correo bancario, publicación en redes, aplicación y oferta de empleo.
- **Evaluación de riesgo digital:** cinco áreas del documento inicial. El cuestionario excluye el bloque adicional de incidentes de la versión anterior. Cada alternativa suma A=0, B=1, C=2; la puntuación normalizada se interpreta como bajo (hasta 33%), moderado (hasta 66%) o alto. Los umbrales son criterios del prototipo, no una escala validada científicamente. Todas las respuestas B producen nivel moderado.

Los comandos de navegación se resuelven antes de los estados de las preguntas. Los iconos no afectan la comparación de las opciones. El botón permanente de inicio crea una conversación nueva. La evaluación muestra progreso; los mensajes y botones de continuación comparten el área desplazable.

## Relación con los documentos del TFG

| Contenido aportado | Aplicación en el asistente |
| --- | --- |
| Propiedades de la ciberseguridad | Confidencialidad, integridad y disponibilidad, con ejemplos y comprobación de comprensión. |
| Gestión del riesgo y resiliencia | Amenaza, vulnerabilidad y riesgo; prevención, respuesta y recuperación; funciones del marco NIST. |
| Protección de datos y tratamiento | Ciclo de vida de los datos, derechos y consentimiento informado. |
| Dimensión institucional y normativa nacional | Orientación sobre PRODHAB, OIJ y alcance del CSIRT-CR; referencias oficiales de Costa Rica. |
| Comparación internacional del Objetivo 1 | Adaptación de buenas prácticas sin trasladar automáticamente competencias o leyes extranjeras. |
| Dimensión educativa y factores humanos | Explicación, decisión, retroalimentación y continuación mediante opciones. |
| Evaluación preventiva en cinco áreas | 25 preguntas y plan por área: contraseñas, navegación, redes sociales, compras en línea y derechos digitales. |

Las recomendaciones se calculan por área, no únicamente a partir del total. Dos personas con igual puntuación global pueden recibir prioridades distintas. Los resultados son orientativos y proceden del autoinforme; no representan un diagnóstico ni una escala validada.

La interfaz mantiene tres recorridos accesibles, respuestas estructuradas, historial desplegable y referencias relacionadas. No utiliza generación abierta de respuestas. La validación académica del contenido y la evaluación de usabilidad descrita en el marco teórico deben realizarse con participantes y revisión experta.

## Revisión de contenido

El texto adjunto constituye una base inicial y requiere revisión académica. No se copiaron automáticamente sus números de artículos, contactos ni afirmaciones jurídicas. El texto oficial de la Ley 8968 distingue consentimiento informado (art. 5), calidad (art. 6), acceso/rectificación/supresión (art. 7) y seguridad (art. 10). La clasificación de datos sensibles se consulta en los arts. 3 y 9: no se afirma que cualquier identificador sea automáticamente un dato sensible.

Los contactos del OIJ se remiten al Poder Judicial, no a `icd.go.cr`. CSIRT-CR tiene una comunidad atendida específica; no se presenta como una ventanilla universal de denuncias ciudadanas. No se incluyeron teléfonos del borrador sin confirmar ni se establecen resultados jurídicos automáticos. HTTPS no garantiza la legitimidad de un sitio. El cuestionario pregunta por la respuesta a credenciales expuestas en lugar de premiar cambios periódicos arbitrarios.

## Referencias de apoyo

El servicio entrega referencias bibliográficas y enlaces relacionados con los temas mencionados en el contenido seleccionado. Se muestran bajo «Referencias de apoyo · APA 7». Esta asociación es una selección editorial por tema, no una búsqueda en tiempo real ni una comprobación automática de cada frase. Las referencias también se conservan al traducir las respuestas.

- Asamblea Legislativa de la República de Costa Rica. (2011). *Ley N.º 8968, Protección de la Persona frente al Tratamiento de sus Datos Personales*. Texto público alojado por MICITT.
- Agencia de Protección de Datos de los Habitantes. (s. f.). *Acerca de Prodhab*. https://www.prodhab.go.cr/acercade/
- Organismo de Investigación Judicial. (s. f.). *¿Dónde puede denunciar?* https://sitiooij.poder-judicial.go.cr/index.php/45-preguntas-frecuentes/3110-donde-puede-denunciar
- Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones. (2023). *CSIRT-CR: RFC-2350* (Versión 1.0). https://www.micitt.go.cr/micitt/csirt-cr-rfc-2350
- Agencia Española de Protección de Datos, & Instituto Nacional de Ciberseguridad. (2016). *Privacidad y seguridad en Internet*. https://www.aepd.es/media/guias/guia-privacidad-y-seguridad-en-internet.pdf
- National Institute of Standards and Technology. (2024). *El Marco de Ciberseguridad (CSF) 2.0 del NIST* (NIST CSWP 29). https://doi.org/10.6028/NIST.CSWP.29.spa

## Verificación

`backend/.venv/Scripts/python.exe -m unittest discover -s backend -p 'test_*.py' -v` ejecuta nueve pruebas: alternativas de orientación y simulación, 45 alternativas de las comprobaciones educativas, cambio de módulo, evaluación completa en tres niveles, personalización por área, rechazo de opciones fuera de contexto, reinicio y conservación de fuentes durante la traducción. La sesión del backend se mantiene en memoria: un reinicio del proceso pierde el estado. La validación de usabilidad con participantes sigue siendo un trabajo posterior del TFG.
