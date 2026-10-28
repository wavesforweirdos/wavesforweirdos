import profile from '../../data/profile.json'
import skills from '../../data/skills.json'
import experience from '../../data/experience.json'
import photoMain from '../../assets/profile/photo-4.webp'
import photoMain360 from '../../assets/profile/photo-4-360.webp'
import photoMain640 from '../../assets/profile/photo-4-640.webp'
import photoMood from '../../assets/profile/photo-1.webp'
import photoMood360 from '../../assets/profile/photo-1-360.webp'
import photoMood640 from '../../assets/profile/photo-1-640.webp'
import './About.scss'
import usePageMeta from '../../hooks/usePageMeta.js'
import { aboutMeta } from '../../data/sectionsMeta.js'

// Ancho real de cada foto (medido en el navegador): el 80% del ancho útil en móvil
// (viewport menos 2rem de margen por lado), tope de 360px hasta 767px, dos
// columnas en tablet y como máximo 450px en escritorio. Un valor ajustado evita
// bajar más píxeles de los necesarios.
const PHOTO_SIZES =
  '(max-width: 600px) calc((100vw - 4rem) * 0.8), (max-width: 767px) 360px, (max-width: 1023px) calc((100vw - 8rem) * 0.4), 450px'

function About() {
  usePageMeta({ title: aboutMeta.metaTitle, description: aboutMeta.metaDescription })
  return (
    <div className="about">
      <div className="about__grid">
        <div className="about__intro">
          <h1 className="about__title">{profile.role}.</h1>
          <div className="about__bio">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="about__column">
          <div className="about__services">
            <h2 className="about__label">Services</h2>
            <ul>
              {profile.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="about__experience">
            <h2 className="about__label">Experience</h2>
            <ul className="about__timeline">
              {experience.map((job) => (
                <li key={`${job.company}-${job.period}`}>
                  <p className="about__timeline-role">
                    {job.company}
                    {job.client ? ` (${job.client})` : ''} — {job.role}
                  </p>
                  <p className="about__timeline-period">{job.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__photo about__photo--main">
          <img
            src={photoMain}
            srcSet={`${photoMain360} 360w, ${photoMain640} 640w, ${photoMain} 900w`}
            sizes={PHOTO_SIZES}
            alt={profile.name}
            width="900"
            height="1096"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="about__photo about__photo--mood">
          <img
            src={photoMood}
            srcSet={`${photoMood360} 360w, ${photoMood640} 640w, ${photoMood} 840w`}
            sizes={PHOTO_SIZES}
            alt=""
            width="840"
            height="1120"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <section className="about__skills">
          <h2 className="about__label">Skills</h2>
          <div className="about__skills-grid">
            {skills.map((group) => (
              <div key={group.category} className="about__skills-group">
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
