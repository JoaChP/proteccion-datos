import { ShieldCheck, Users, GraduationCap, Lock } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import './Pillars.css'

const pillarConfig = [
  { key: 'prevention', icon: ShieldCheck, color: 'var(--cyan-500)' },
  { key: 'guidance',   icon: Users,       color: 'var(--green-500)' },
  { key: 'education',  icon: GraduationCap, color: 'var(--purple-500)' },
  { key: 'trust',      icon: Lock,        color: 'var(--blue-500)' },
]

export default function Pillars() {
  const { t } = useLang()

  return (
    <>
      {/* Pillars row */}
      <section className="pillars" aria-labelledby="pillars-heading">
        <div className="container">
          <h2 id="pillars-heading" className="sr-only">{t.sections.pillarsTitle}</h2>
          <div className="pillars__grid">
            {pillarConfig.map(({ key, icon: Icon, color }) => {
              const p = t.pillars[key]
              return (
                <div key={key} className="pillar">
                  <div className="pillar__icon" style={{ color }}>
                    <Icon size={32} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="pillar__title">{p.title}</h3>
                    <p className="pillar__desc">{p.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Thesis info banner */}
      <section className="thesis-banner" aria-label="Información del proyecto de tesis">
        <div className="container">
          <div className="thesis-banner__inner">
            {/* Project */}
            <div className="thesis-banner__block">
              <div className="thesis-banner__icon-wrap">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="thesis-banner__label">{t.thesis.project}</p>
                <p className="thesis-banner__value">{t.thesis.projectDesc}</p>
              </div>
            </div>

            <div className="thesis-banner__divider" />

            {/* Student */}
            <div className="thesis-banner__block">
              <div>
                <p className="thesis-banner__label">{t.thesis.student}</p>
                <p className="thesis-banner__value thesis-banner__value--name">{t.thesis.studentName}</p>
                <p className="thesis-banner__sub">{t.thesis.university}</p>
                <p className="thesis-banner__sub">{t.thesis.faculty}</p>
                <p className="thesis-banner__sub">{t.thesis.school}</p>
              </div>
            </div>

            <div className="thesis-banner__divider" />

            {/* Modality */}
            <div className="thesis-banner__block">
              <div>
                <p className="thesis-banner__label">{t.thesis.modality}</p>
                <p className="thesis-banner__value">{t.thesis.modalityDesc}</p>
              </div>
            </div>

            <div className="thesis-banner__divider" />

            {/* Date */}
            <div className="thesis-banner__block thesis-banner__block--date">
              <div>
                <p className="thesis-banner__label">{t.thesis.date}</p>
                <p className="thesis-banner__value thesis-banner__value--date">{t.thesis.dateValue}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
