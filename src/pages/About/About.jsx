import profile from '../../data/profile.json'
import photoMain from '../../assets/profile/photo-4.jpeg'
import './About.scss'

function About() {
  return (
    <div className="about">
      <div className="about__intro">
        <h1 className="about__title">{profile.role}.</h1>
        <p className="about__bio">{profile.bio}</p>
      </div>

      <div className="about__services">
        <h2 className="about__services-title">Services</h2>
        <ul>
          {profile.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>

      <div className="about__photo">
        <img src={photoMain} alt={profile.name} />
      </div>
    </div>
  )
}

export default About
