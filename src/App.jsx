import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './Dashboard/Hero'
import Projects from './Dashboard/Projects'
import Footer from './components/Footer'

const CONTACT_EMAIL = 'sacs7808@gmail.com'
const CONTACT_PHONE = '9361453585'

const EXPERIENCE = [
  {
    title: 'Freelance SaaS & Web Application Developer',
    company: 'Independent',
    period: '2025 - Present',
    points: [
      'Delivering complete SaaS and web application builds from planning to deployment.',
      'Handling frontend architecture, backend APIs, authentication, and database design.',
      'Supporting clients with feature upgrades, bug fixing, and performance improvements.',
    ],
  },
  {
    title: 'Full Stack Developer',
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

const SERVICES = [
  {
    title: 'SaaS MVP Development',
    description: 'End-to-end MVP delivery with auth, subscription-ready flow, dashboard, and API integration.',
  },
  {
    title: 'Web App Architecture',
    description: 'Scalable frontend + backend structure with reusable components, modular APIs, and clean database models.',
  },
  {
    title: 'Feature Development',
    description: 'New feature implementation, existing codebase improvements, bug fixing, and optimization.',
  },
]

const SKILLS = {
  SaaSDevelopment: ['MERN Stack', 'React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
  Architecture: ['System Design', 'API Architecture', 'Database Design', 'Authentication Flow', 'Role-Based Access'],
  Delivery: ['GitHub Workflow', 'Deployment Support', 'Debugging', 'Performance Optimization', 'Client Collaboration'],
}

const PROFILE_DETAILS = [
  { label: 'Primary Expertise', value: 'SaaS Platforms & Web Applications' },
  { label: 'Hourly Pricing', value: '$40/hour (editable)' },
  { label: 'Engagement Model', value: 'Hourly / Fixed Scope' },
  { label: 'Availability', value: 'Open for New Projects' },
  { label: 'Timezone', value: 'IST (Flexible with overlap)' },
  { label: 'Location', value: 'India' },
]

const TESTIMONIALS = [
  {
    id: 1,
    client: 'Rafi M.',
    role: 'Owner, Retail Store',
    project: 'Store Landing Page',
    rating: '4.0',
    feedback:
      'Sachin redesigned our store landing page with better product sections and clearer call-to-action blocks. Mobile loading improved and customers started contacting us faster through the page.',
  },
  {
    id: 2,
    client: 'Anandu P.',
    role: 'Project Coordinator, College Team',
    project: 'College Management Platform',
    rating: '4.5',
    feedback:
      'He built attendance tracking, lecture video management, student-teacher chat, and AI-based support features in one structured system. The platform became much easier for daily academic operations.',
  },
  {
    id: 3,
    client: 'Shamil K.',
    role: 'Founder, Service Startup',
    project: 'Operations Web App',
    rating: '4.0',
    feedback:
      'We hired Sachin to fix backend issues and improve dashboard workflows. He delivered stable API updates and cleaner frontend flow without breaking existing modules.',
  },
]

function ServicesSection() {
  return (
    <Motion.section
      id="services"
      className="bg-surface/40 px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          description="Freelancer-focused services for SaaS products, business web apps, and production-ready feature delivery."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.title} className="interactive-panel rounded-xl border border-border bg-white p-6">
              <h3 className="font-display text-2xl text-text-primary">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Motion.section>
  )
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
          title="Freelance + Production Experience"
          description="Hands-on delivery experience from internships to freelance SaaS and web app development."
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
          title="SaaS-Focused Technical Expertise"
          description="Balanced frontend, backend, architecture, and execution skills for client projects."
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
          title="Freelancer Profile"
          description="I focus on SaaS and custom web applications with practical structure, fast iteration, and clean implementation."
        />
        <article className="interactive-panel rounded-xl border border-border bg-surface p-6 text-text-secondary md:p-8">
          <p className="leading-relaxed">
            I help clients turn ideas into structured products by handling planning, implementation, and delivery with clear communication and maintainable code.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PROFILE_DETAILS.map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </Motion.section>
  )
}

function TestimonialsSection() {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    project: '',
    rating: '',
    review: '',
  })
  const [reviewStatus, setReviewStatus] = useState('')

  const onChangeReview = (event) => {
    const { name, value } = event.target
    setReviewForm((prev) => ({ ...prev, [name]: value }))
    setReviewStatus('')
  }

  const onSubmitReview = (event) => {
    event.preventDefault()
    if (!reviewForm.name.trim() || !reviewForm.project.trim() || !reviewForm.rating.trim() || !reviewForm.review.trim()) {
      setReviewStatus('Please fill all review fields before submitting.')
      return
    }
    setReviewStatus('Thank you. Your review will be added shortly.')
    setReviewForm({ name: '', project: '', rating: '', review: '' })
  }

  return (
    <Motion.section
      id="testimonials"
      className="bg-surface/40 px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client Feedback From Delivered Projects"
          description="Specific project feedback based on delivery quality, communication, and final outcome."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className="testimonial-card">
              <p className="testimonial-project">{item.project}</p>
              <p className="testimonial-rating">
                <i className="fa-solid fa-star mr-2" aria-hidden="true" />
                {item.rating} / 5
              </p>
              <p className="mt-3 text-text-secondary">&quot;{item.feedback}&quot;</p>
              <p className="mt-4 text-sm font-medium text-text-primary">{item.client}</p>
              <p className="text-sm text-text-muted">{item.role}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-white p-6 md:p-8">
          <h3 className="font-display text-3xl text-text-primary">Leave A Review</h3>
          <p className="mt-2 text-text-secondary">
            Share your feedback for a delivered project. Verified reviews will be published on this page.
          </p>
          <form onSubmit={onSubmitReview} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={reviewForm.name}
              onChange={onChangeReview}
              placeholder="Your name"
              className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
            <input
              name="project"
              value={reviewForm.project}
              onChange={onChangeReview}
              placeholder="Project name"
              className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
            <input
              name="rating"
              value={reviewForm.rating}
              onChange={onChangeReview}
              placeholder="Rating (example: 4.5)"
              className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
            <input
              name="review"
              value={reviewForm.review}
              onChange={onChangeReview}
              placeholder="Your review"
              className="rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
            <button type="submit" className="btn-primary w-fit">Submit Review</button>
          </form>
          {reviewStatus && <p className="mt-4 text-sm text-text-secondary">{reviewStatus}</p>}
        </div>
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
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setStatus(`Your mail app should open now. If it did not, email me directly at ${CONTACT_EMAIL}.`)
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setStatus(`Email copied: ${CONTACT_EMAIL}`)
    } catch {
      setStatus(`Could not copy email automatically. Use: ${CONTACT_EMAIL}`)
    }
  }

  const onCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_PHONE)
      setStatus(`Phone copied: ${CONTACT_PHONE}`)
    } catch {
      setStatus(`Could not copy phone automatically. Use: ${CONTACT_PHONE}`)
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
          Available for SaaS builds, web application projects, and long-term product development support.
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          Email: {CONTACT_EMAIL} | Phone: {CONTACT_PHONE}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" title="Add resume link later">
            <i className="fa-solid fa-file-lines mr-2" aria-hidden="true" />
            Resume
          </button>
          <button type="button" className="btn-secondary" onClick={onCopy}>
            <i className="fa-regular fa-copy mr-2" aria-hidden="true" />
            Copy Email
          </button>
          <button type="button" className="btn-secondary" onClick={onCopyPhone}>
            <i className="fa-solid fa-phone mr-2" aria-hidden="true" />
            Copy Phone
          </button>
          <a className="btn-secondary" href={`tel:${CONTACT_PHONE}`}>
            <i className="fa-solid fa-phone-volume mr-2" aria-hidden="true" />
            Call
          </a>
          <a className="btn-secondary" href="https://github.com/SachinRamasamy-cloud" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github mr-2" aria-hidden="true" />
            GitHub
          </a>
          <a className="btn-secondary" href="https://www.linkedin.com/in/sachin-ramasamy-5146092b5/" target="_blank" rel="noreferrer">
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
        <ServicesSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
