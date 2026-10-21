import profile from '../../data/profile.json'
import skills from '../../data/skills.json'
import experience from '../../data/experience.json'
import photoMain from '../../assets/profile/photo-4.webp'
import photoMainSm from '../../assets/profile/photo-4-600.webp'
import photoMood from '../../assets/profile/photo-1.webp'
import photoMoodSm from '../../assets/profile/photo-1-600.webp'
import './About.scss'
import usePageMeta from '../../hooks/usePageMeta.js'

// Las fotos ocupan el 80% del ancho en móvil/tablet y como máximo 450px en escritorio.
const PHOTO_SIZES = '(max-width: 1023px) 80vw, 450px'

function About() {
  usePageMeta({
    title: 'About',
    description:
      'Marta Cruz: de la animación y el diseño al desarrollo Full Stack y Frontend. Trayectoria, experiencia y skills.',
  })
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
            srcSet={`${photoMainSm} 600w, ${photoMain} 900w`}
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
            srcSet={`${photoMoodSm} 600w, ${photoMood} 840w`}
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
