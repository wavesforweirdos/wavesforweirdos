import profile from '../../data/profile.json'
import skills from '../../data/skills.json'
import experience from '../../data/experience.json'
import photoMain from '../../assets/profile/photo-4.jpeg'
import photoMood from '../../assets/profile/photo-1.jpeg'
import './About.scss'

function About() {
  return (
    <div className="about">
      <div className="about__top">
        <div className="about__intro">
          <h1 className="about__title">{profile.role}.</h1>
          <p className="about__bio">{profile.bio}</p>
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
          <img src={photoMain} alt={profile.name} />
        </div>
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

      <div className="about__photo about__photo--mood">
        <img src={photoMood} alt="" />
      </div>
    </div>
  )
}

export default About
