"""Public supporting references for the curated educational content."""

LAW = {
    "title": "Asamblea Legislativa de la República de Costa Rica. (2011). Ley N.º 8968, Protección de la Persona frente al Tratamiento de sus Datos Personales.",
    "url": "https://www.micitt.go.cr/sites/default/files/marco_juridico_legal/08.%20Ley%20n.%C2%B0%208968%20Ley%20de%20Protecci%C3%B3n%20de%20la%20Persona%20frente%20al%20tratamiento%20de%20sus%20datos%20personales..pdf",
}
PRODHAB = {"title": "Agencia de Protección de Datos de los Habitantes. (s. f.). Acerca de Prodhab.", "url": "https://www.prodhab.go.cr/acercade/"}
OIJ = {"title": "Organismo de Investigación Judicial. (s. f.). ¿Dónde puede denunciar?", "url": "https://sitiooij.poder-judicial.go.cr/index.php/45-preguntas-frecuentes/3110-donde-puede-denunciar"}
CSIRT = {"title": "Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones. (2023). CSIRT-CR: RFC-2350 (Versión 1.0).", "url": "https://www.micitt.go.cr/micitt/csirt-cr-rfc-2350"}
PRIVACY = {"title": "Agencia Española de Protección de Datos, & Instituto Nacional de Ciberseguridad. (2016). Privacidad y seguridad en Internet.", "url": "https://www.aepd.es/media/guias/guia-privacidad-y-seguridad-en-internet.pdf"}

def supporting_sources(text: str) -> list[dict[str, str]]:
    """References support a topic; this is not live retrieval or legal advice."""
    lower = text.lower()
    sources = []
    for terms, source in [
        (("8968", "derecho de", "consentimiento", "datos sensibles"), LAW),
        (("prodhab",), PRODHAB),
        (("oij",), OIJ),
        (("csirt",), CSIRT),
        (("contraseña", "phishing", "permisos", "redes sociales", "autenticación"), PRIVACY),
    ]:
        if any(term in lower for term in terms):
            sources.append(source)
    return sources
