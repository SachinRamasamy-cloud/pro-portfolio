import { Canvas } from '@react-three/fiber'
import DeveloperHero3D from '../components/DeveloperScene'

const TECH_BADGES = ['MERN', 'Redis', 'BullMQ', 'REST API', 'Docker', 'VM']

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 md:px-12">
      <div className="mx-auto grid h-[calc(100vh-76px)] max-w-6xl items-center gap-8 md:grid-cols-2">
        <div className="max-w-2xl">
          <p className="hero-kicker">
            <i className="fa-solid fa-code-branch mr-2" aria-hidden="true" />
            Full Stack Developer Trainee at Dromolys
          </p>

          <h1 className="font-display text-4xl leading-tight text-text-primary md:text-6xl">
            Building Practical Products Across Frontend, Backend, and Infrastructure.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            Internship at Luminar Technolab (June 2025), now building production-focused features with MERN, Redis, BullMQ, Docker, and VM workflows.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {TECH_BADGES.map((tag) => (
              <span key={tag} className="tech-chip">{tag}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              <i className="fa-solid fa-layer-group mr-2" aria-hidden="true" />
              View Projects
            </a>
            <button type="button" className="btn-secondary" title="Add resume link later">
              <i className="fa-solid fa-file-lines mr-2" aria-hidden="true" />
              Resume (Coming Soon)
            </button>
            <a href="#contact" className="btn-secondary">
              <i className="fa-regular fa-message mr-2" aria-hidden="true" />
              Contact
            </a>
          </div>
        </div>

        <div className="hero-canvas-wrap hidden md:block">
          <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 2]}>
            <DeveloperHero3D />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
