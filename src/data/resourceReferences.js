// Metadatos bibliográficos de las fuentes, no de los títulos divulgativos de las tarjetas.
const aepd = 'Agencia Española de Protección de Datos'
const incibe = 'Instituto Nacional de Ciberseguridad'
const micitt = 'Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones'
const nist = 'National Institute of Standards and Technology'
const enisa = 'European Union Agency for Cybersecurity'

export const resourceReferences = {
  ley: { legal: true, title: 'Ley N.º 8968, Protección de la Persona frente al Tratamiento de sus Datos Personales', year: '2011', publisher: 'La Gaceta, 170, 5 de septiembre de 2011' },
  privacidad: { author: `${aepd}, & ${incibe}`, year: '2016', title: 'Privacidad y seguridad en Internet' },
  fraudes: { author: incibe, year: 's. f.', title: 'Guía de fraudes online' },
  videos: { author: aepd, year: '2025', date: '22 de julio', title: 'Protege tu privacidad', kind: 'Colección de videos' },
  medidas: { author: aepd, year: '2026', date: '14 de septiembre', title: 'Catálogo de medidas preventivas y herramientas para proteger la privacidad' },
  nist: { author: nist, year: '2024', title: 'NIST Cybersecurity Framework 2.0: Guía de recursos y descripción general', edition: 'NIST SP 1299 spa', url: 'https://doi.org/10.6028/NIST.SP.1299.spa' },
  ficha: { author: 'Chavarría Peraza, J. E.', year: '2026', title: 'Mi lista de protección digital', kind: 'Ficha educativa', publisher: 'Protección de Datos CR' },
  prodhab: { author: 'Agencia de Protección de Datos de los Habitantes', year: 's. f.', title: 'Acerca de Prodhab' },
  micitt: { author: micitt, year: 's. f.', title: 'Dirección de Ciberseguridad' },
  csirt: { author: micitt, year: '2023', date: '10 de noviembre', title: 'CSIRT-CR: RFC-2350', edition: 'Versión 1.0' },
  'estrategia-cr': { author: micitt, year: '2023', title: 'Estrategia Nacional de Ciberseguridad de Costa Rica 2023–2027' },
  'una-2023': { author: 'Vega Briceño, E., Lemaitre Picado, R., Villegas Carranza, A., & Solís Cordoncillo, C. M.', year: '2024', title: 'Estado de la ciberseguridad en Costa Rica 2023', publisher: 'Universidad Nacional, Sede Regional Chorotega' },
  conti: { author: 'Teletica Costa Rica', year: '2022', date: '21 de abril', title: 'Instituciones del Estado siguen bajo ataque cibernético por parte de Conti', kind: 'Video', publisher: 'YouTube' },
  'phishing-video': { author: 'INCIBE', year: 's. f.', title: 'Cazando phishing | #ExploradorINCIBE', kind: 'Video', publisher: 'YouTube' },
  'instagram-video': { author: aepd, year: 's. f.', title: 'Configura tu privacidad en Instagram', kind: 'Video', publisher: 'YouTube' },
  'whatsapp-video': { author: aepd, year: 's. f.', title: 'Configura tu privacidad en WhatsApp', kind: 'Video', publisher: 'YouTube' },
  contrasenas: { author: incibe, year: 's. f.', title: 'Gestión de contraseñas seguras' },
  'nist-completo': { author: nist, year: '2024', title: 'El Marco de Seguridad Cibernética (CSF) 2.0 del NIST', edition: 'NIST CSWP 29 spa', url: 'https://doi.org/10.6028/NIST.CSWP.29.spa' },
  'enisa-ai': { author: enisa, year: '2023', title: 'Cybersecurity of AI and standardisation' },
  'enisa-2025': { author: enisa, year: '2025', title: 'ENISA threat landscape 2025' },
  'bid-2020': { author: 'Banco Interamericano de Desarrollo, & Organización de los Estados Americanos', year: '2020', title: 'Reporte Ciberseguridad 2020: Riesgos, avances y el camino a seguir en América Latina y el Caribe', url: 'https://doi.org/10.18235/0002513' },
  rgpd: { legal: true, year: '2016', title: 'Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos', publisher: 'Diario Oficial de la Unión Europea, L 119, 1–88' },
}

export function attachReferences(items) {
  const result = items.map(item => {
    const metadata = item.reference || resourceReferences[item.id]
    if (!metadata) throw new Error(`Falta referencia APA: ${item.id}`)
    return { ...item, reference: { ...metadata, url: metadata.url || (item.local ? `https://proteccion-datos-web.vercel.app${item.url}` : item.url) } }
  })
  // APA: obras del mismo autor y año se distinguen por letras según el título.
  const groups = new Map()
  result.forEach(item => {
    const ref = item.reference
    if (ref.legal) return
    const key = `${ref.author}|${ref.year}`
    groups.set(key, [...(groups.get(key) || []), ref])
  })
  groups.forEach(refs => {
    if (refs.length < 2) return
    refs.sort((a, b) => a.title.localeCompare(b.title, 'es')).forEach((ref, index) => {
      ref.suffix = `${ref.year === 's. f.' ? '-' : ''}${String.fromCharCode(97 + index)}`
    })
  })
  return result
}

export function referenceDate(ref) {
  return `${ref.year}${ref.suffix || ''}${ref.date ? `, ${ref.date}` : ''}`
}

export function referenceText(ref) {
  const title = `${ref.title}${ref.edition ? ` (${ref.edition})` : ''}${ref.kind ? ` [${ref.kind}]` : ''}`
  return `${ref.legal ? `${title}. (${referenceDate(ref)}).` : `${ref.author}${ref.author.endsWith('.') ? '' : '.'} (${referenceDate(ref)}). ${title}.`}${ref.publisher ? ` ${ref.publisher}.` : ''} ${ref.url}`
}
