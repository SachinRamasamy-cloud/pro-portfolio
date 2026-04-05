import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './Dashboard/Hero'
import Projects from './Dashboard/Projects'
import Footer from './components/Footer'

const EXPERIENCE = [
  {
    title: 'Full Stack Developer Trainee',
    company: 'Dromolys',
    period: 'February 2026 - Present',
    points: [
      'Building and maintaining full-stack features across MERN modules.',
      'Working on REST APIs, backend task flows, and production-ready debugging.',
      'Contributing through GitHub workflow, pull requests, and iterative fixes.',
    ],
  },
  {
    title: 'Internship Trainee',
    company: 'Luminar Technolab',
    period: 'June 2025 - November 2025',
    points: [
      'Built practical web applications and strengthened JavaScript + React foundations.',
      'Implemented API integration, form handling, and responsive interfaces.',
      'Moved from learning mode into project execution with real deadlines.',
    ],
  },
]

const SKILLS = {
  FullStack: ['MERN', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
  BackendInfra: ['Redis', 'BullMQ', 'Docker', 'VM Setup', 'API Debugging'],
  UIAndTools: ['Tailwind CSS', 'CSS', 'Bootstrap', 'MUI', 'Figma', 'GitHub', 'Python'],
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-4xl text-text-primary md:text-5xl">{title}</h2>
      <p className="mt-4 text-text-secondary">{description}</p>
    </div>
  )
}

function ExperienceSection() {
  return (
    <Motion.section
      id="experience"
      className="px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="Internship To Production-Focused Development"
          description="Started at Luminar Technolab and now training in production-like full stack delivery at Dromolys."
        />
        <div className="mt-12 grid gap-6">
          {EXPERIENCE.map((item) => (
            <article key={item.title} className="interactive-panel rounded-xl border border-border bg-surface/70 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-3xl text-text-primary">{item.title}</h3>
                <span className="text-sm text-text-muted">{item.period}</span>
              </div>
              <p className="mt-1 font-medium text-accent">{item.company}</p>
              <ul className="mt-4 space-y-2 text-text-secondary">
                {item.points.map((point) => (
                  <li key={point}>
                    <i className="fa-solid fa-check mr-2 text-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Motion.section>
  )
}

function SkillsSection() {
  const groups = useMemo(() => Object.entries(SKILLS), [])
  return (
    <Motion.section
      id="skills"
      className="bg-surface/40 px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Frontend + Backend + Infra"
          description="I work on UI, API, queues, caching, and deployment-oriented tooling."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {groups.map(([group, items]) => (
            <article key={group} className="interactive-panel rounded-xl border border-border bg-white p-6">
              <h3 className="font-display text-2xl text-text-primary">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Motion.section>
  )
}

function AboutSection() {
  return (
    <Motion.section
      id="about"
      className="px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2">
        <SectionHeading
          eyebrow="About"
          title="I Build Complete Features, Not Only UI"
          description="I can take a feature from interface to backend logic, with clean API structure and practical production thinking."
        />
        <article className="interactive-panel rounded-xl border border-border bg-surface p-6 leading-relaxed text-text-secondary md:p-8">
          <p>
            My work includes frontend UI, backend API development, queue-based processing with BullMQ, caching with Redis, and environment setup using Docker and VM-based workflows.
          </p>
          <p className="mt-4">
            I focus on features that are clear for users and maintainable for developers.
          </p>
        </article>
      </div>
    </Motion.section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill all fields before sending.')
      return
    }

    const subject = encodeURIComponent(`Portfolio Contact - ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`
    setStatus('Your mail app should open now. If it did not, email me directly at youremail@example.com.')
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText('youremail@example.com')
      setStatus('Email copied: youremail@example.com')
    } catch {
      setStatus('Could not copy email automatically. Use: youremail@example.com')
    }
  }

  return (
    <Motion.section
      id="contact"
      className="px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-5xl rounded-xl border border-border bg-[#f0e7d7] p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Contact</p>
        <h2 className="mt-3 font-display text-4xl text-text-primary md:text-5xl">Let&apos;s Connect</h2>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Open to full stack opportunities across frontend, backend, and infra-related tasks.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" title="Add resume link later">
            <i className="fa-solid fa-file-lines mr-2" aria-hidden="true" />
            Resume (Coming Soon)
          </button>
          <button type="button" className="btn-secondary" onClick={onCopy}>
            <i className="fa-regular fa-copy mr-2" aria-hidden="true" />
            Copy Email
          </button>
          <a className="btn-secondary" href="https://github.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github mr-2" aria-hidden="true" />
            GitHub
          </a>
          <a className="btn-secondary" href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin mr-2" aria-hidden="true" />
            LinkedIn
          </a>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="text-sm text-text-secondary" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            placeholder="Your name"
          />

          <label className="text-sm text-text-secondary" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            placeholder="you@example.com"
          />

          <label className="text-sm text-text-secondary" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={onChange}
            rows={5}
            className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            placeholder="Tell me about your project or opportunity"
          />

          <button type="submit" className="btn-primary w-fit">Send Message</button>
        </form>

        {status && <p className="mt-4 text-sm text-text-secondary">{status}</p>}
      </div>
    </Motion.section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App

