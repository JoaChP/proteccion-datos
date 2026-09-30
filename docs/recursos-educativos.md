# Recursos educativos

## Alcance final aprobado

Actualización bibliográfica: la biblioteca contiene ahora 34 recursos, incluidos 23 documentos. Se incorporaron 12 documentos de las referencias del autor y los tres informes UNA tienen un bloque destacado. Cada recurso posee metadatos APA 7 y referencia visible desplegable; la bibliografía completa está ordenada alfabéticamente y se descarga como texto. Las referencias visibles participan en el cambio de idioma de la página, tanto en las fichas como en la bibliografía completa. La descarga de texto conserva los metadatos originales.

Las limitaciones históricas sobre el informe 2024/2025 se resolvieron: el informe 2024 tiene el identificador de archivo `4853e1b3-c476-4932-9452-252a257c7d4e`, confirmado en el repositorio. Se verificó el documento original del informe 2025 en una copia externa alojada en CloudFront, cuyos créditos identifican a Vega Briceño, Lemaitre Picado, Villegas Carranza y Flores Barrantes, abril de 2026. El sitio informa que la copia está fuera del repositorio institucional. La existencia y alcance del tercer informe también se confirmó en UNA Comunica (9 de abril de 2026).

Correcciones bibliográficas: autores del manual del DPD, Korff y Georges (2019); evaluaciones de amenazas canadienses 2023–2024 y 2025–2026 publicadas respectivamente en 2022 y 2024; coautoría institucional completa de la guía UIT 2018. Los autores de los informes UNA se citan como autores, según sus créditos, no como editores. En fechas no confirmadas se usa «s. f.» y se explica la limitación en pantalla. Las letras para autor/año repetidos se calculan según los títulos de esta biblioteca. Las referencias jurídicas se presentan por título del instrumento, año, publicación oficial y enlace. La descarga TXT conserva los datos, no cursivas ni sangría.

La página es exclusivamente una biblioteca de documentos, videos, páginas de consulta y material descargable. Por indicación del autor se retiraron los casos prácticos, conceptos, preguntas frecuentes, actividades de las fichas y lista interactiva. La ficha HTML se conserva como recurso descargable. Las referencias a funcionalidades interactivas en las notas históricas siguientes describen versiones anteriores, no la página final.

La ruta `/recursos` desarrolla el objetivo específico 3 de la propuesta: facilitar contenidos accesibles de privacidad, prevención y protección de datos. Se tomó como contexto el resumen de propuesta CTFG-DOC-06 y la introducción del análisis internacional facilitados por el autor. Los documentos académicos originales no se publican en el sitio.

## Contenido y mantenimiento

- Catálogo en `src/data/resources.js`: título, autor institucional, alcance territorial, formato, nivel, tema y enlace de origen.
- Documentos de MICITT, AEPD/INCIBE y NIST, colección de videos de AEPD y ficha propia en HTML accesible e imprimible. Los PDF permanecen alojados por sus instituciones; no se redistribuyen copias.
- Revisión de fuentes: 29 de septiembre de 2026. Se verificaron páginas institucionales y documentos; la guía de fraudes fue localizada en el índice de INCIBE, pero su lectura completa mediante el navegador de investigación superó el límite de tamaño (12,4 MB). No se verificó cada video de la colección individualmente.
- NIST SP 1299 corresponde a *NIST CSF 2.0: Guía de recursos y descripción general*, no a una guía de privacidad para pequeñas empresas como decía la referencia aportada. Se corrigió el título en este catálogo.
- Los materiales españoles se identifican como referencias educativas. No se presentan sus procedimientos jurídicos o canales de atención como aplicables en Costa Rica.
- La ficha es elaboración propia basada en las fuentes enlazadas. Se puede guardar como PDF mediante impresión del navegador; el archivo descargable es HTML.

## Funcionalidad

Búsqueda sin distinción de tildes, filtros combinados por formato y tema, estado sin resultados y reinicio. La lista de prácticas usa solo estado React, sin persistencia ni envío de respuestas. No se incrustan reproductores externos. El sitio conserva su sistema existente de idioma y tema.

Al actualizar el catálogo, revisar títulos y destino de cada enlace, fechas, alcance territorial y accesibilidad. Mantener sincronizadas la lista interactiva y la ficha imprimible. Revisar periódicamente las instrucciones de aplicaciones porque sus interfaces cambian.

## Ampliación guiada por las referencias del autor

El catálogo contiene 22 recursos: 11 documentos, 5 entradas audiovisuales (una colección y cuatro videos), 3 páginas institucionales, 2 guías web y 1 ficha del proyecto. Las incorporaciones se encuentran en `src/data/additionalResources.js`. Se agregó filtro de idioma, búsqueda por alcance territorial y actividades de reflexión para cada incorporación.

Fuentes bibliográficas incorporadas: PRODHAB, Dirección de Ciberseguridad y CSIRT-CR del MICITT, Estrategia Nacional 2023–2027, informe UNA de 2023 publicado en 2024, reportaje de Teletica sobre Conti, marco NIST CSF 2.0, informe ENISA sobre IA, ENISA Threat Landscape 2025, reporte BID/OEA 2020 y RGPD. Complementos educativos: video de phishing de INCIBE, guía de contraseñas de INCIBE y dos tutoriales enlazados por la AEPD.

Verificación y decisiones editoriales:

- Las referencias aportadas del estado de ciberseguridad UNA 2023 y 2024 comparten URL. La ficha oficial confirma el título 2023 y publicación 2024; se incorporó una sola vez. La ficha 2025 no pudo verificarse porque el repositorio rechazó la consulta automatizada, por lo que no se agregó.
- PRODHAB se confirmó mediante el índice de búsqueda del dominio oficial; la apertura directa falló. El PDF de la estrategia del MICITT respondió, pero excedió el límite de lectura (aproximadamente 16 MB); no se afirma haber revisado todo su contenido.
- Los enlaces a Instagram y WhatsApp se obtuvieron de la página oficial https://www.aepd.es/areas-de-actuacion/internet-y-redes-sociales/protege-tu-privacidad. El buscador confirmó los videos de INCIBE y Teletica. No se verificó reproducción completa ni disponibilidad de subtítulos de cada video.
- Para ENISA 2025 y BID/OEA 2020 se prefirieron las páginas oficiales de publicación, que ofrecen los archivos y su contexto. Se mantienen las ediciones citadas sin calificarlas como el panorama más reciente.
- No se incluyeron copias de normas ISO alojadas por terceros ni referencias cuya correspondencia no pudo verificarse.

Validación: compilación de producción correcta; navegador muestra 22 recursos, 5 entradas audiovisuales y 2 recursos en inglés. Combinación Videos + Inglés produce estado vacío y Limpiar filtros restaura los 22 recursos.
