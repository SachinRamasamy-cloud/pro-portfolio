import heroImage from '../assets/hero.jpg'

const TECH_BADGES = ['SaaS', 'Web Applications', 'React', 'Node.js', 'API Architecture', 'MongoDB']

const FREELANCE_HIGHLIGHTS = [
  { label: 'Hourly Pricing', value: '$15/hr' },
  { label: 'Project Type', value: 'SaaS + Web Apps' },
  { label: 'Availability', value: '20+ hrs/week' },
]

export default function Hero() {
  return (
    <section id="top" className="relative px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl items-center gap-8 md:grid-cols-2">
        <div className="max-w-2xl">
          <p className="hero-kicker">
            <i className="fa-solid fa-code-branch mr-2" aria-hidden="true" />
            Freelance SaaS & Web Application Expert
          </p>

          <h1 className="font-display text-4xl leading-tight text-text-primary md:text-6xl">
            I Build SaaS Products And Web Applications End-to-End.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            I help founders and businesses plan, build, and ship reliable web products with clean frontend, scalable backend, and practical deployment structure.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {TECH_BADGES.map((tag) => (
              <span key={tag} className="tech-chip">{tag}</span>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {FREELANCE_HIGHLIGHTS.map((item) => (
              <article key={item.label} className="hero-highlight-card">
                <p className="hero-highlight-label">{item.label}</p>
                <p className="hero-highlight-value">{item.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              <i className="fa-solid fa-layer-group mr-2" aria-hidden="true" />
              View Projects
            </a>
            <button type="button" className="btn-secondary" title="Add resume link later">
              <i className="fa-solid fa-file-lines mr-2" aria-hidden="true" />
              Resume
            </button>
            <a href="#contact" className="btn-secondary">
              <i className="fa-regular fa-message mr-2" aria-hidden="true" />
              Contact
            </a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            src={heroImage}
            alt="Sachin portrait"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  )
}
