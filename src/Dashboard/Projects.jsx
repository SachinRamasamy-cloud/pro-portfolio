import { useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import giftyImage from '../assets/gifty.webp'
import pulseImage from '../assets/pulse.webp'
import zenkaiImage from '../assets/zenkai.webp'

const PROJECTS = [
  {
    id: 1,
    title: 'Gifty',
    year: 2026,
    featured: true,
    category: 'FinTech',
    summary: 'Gift card purchase platform with Bitcoin + Stripe payment flows, secure auth, and structured order tracking.',
    details:
      'Built a complete checkout and transaction workflow so users can buy gift cards with modern payment options while keeping account and order data consistent.',
    scope: 'MERN architecture, authentication, Stripe integration, Bitcoin purchase flow, and database management.',
    engagement: 'End-to-end product implementation',
    outcome: 'Solves payment flexibility for digital gift card buyers and gives admins clear transaction visibility.',
    stack: ['MERN', 'Redis', 'Stripe', 'Bitcoin API', 'JWT'],
    image: giftyImage,
    repo: 'https://github.com/SachinRamasamy-cloud/gifty',
    live: 'https://sachinramasamy-cloud.github.io/gifty/',
  },
  {
    id: 2,
    title: 'Pulse',
    year: 2026,
    featured: true,
    category: 'Infrastructure',
    summary: 'Server maintenance and monitoring platform to register servers, inspect details, and manage operations securely.',
    details:
      'Designed secure data handling with salting and peppering strategies, role-based operations, and reliable storage patterns for sensitive infrastructure metadata.',
    scope: 'MERN + Redis backend structure, secure credential processing, server management modules, and operational dashboard.',
    engagement: 'Security-focused full stack build',
    outcome: 'Solves fragmented server tracking by centralizing management and improving data safety for operational teams.',
    stack: ['MERN', 'Redis', 'Security Hardening', 'REST API'],
    image: pulseImage,
    repo: 'https://github.com/SachinRamasamy-cloud/Pulse',
    live: 'https://pulse-beta-plum.vercel.app/',
  },
  {
    id: 3,
    title: 'Zenkai',
    year: 2025,
    featured: true,
    category: 'Media',
    summary: 'Anime and manga discovery platform with advanced search, optimized browsing, and polished animated UI.',
    details:
      'Implemented rich filtering and request rate limiting to keep results fast and stable even during high user activity.',
    scope: 'MERN + Redis architecture, search optimization, rate limiting, and responsive motion-driven interface.',
    engagement: 'Performance-first full stack build',
    outcome: 'Solves content discovery friction with fast, focused search and protects APIs through controlled request flow.',
    stack: ['MERN', 'Redis', 'Rate Limiting', 'Framer Motion'],
    image: zenkaiImage,
    repo: 'https://github.com/SachinRamasamy-cloud/zenkai',
    live: 'https://sachinramasamy-cloud.github.io/zenkai/',
  },
]

const FILTERS = ['All', 'FinTech', 'Infrastructure', 'Media']

function PlaceholderLink({ href, label, icon }) {
  const [clicked, setClicked] = useState(false)

  const onClick = (event) => {
    if (href.includes('placeholder')) {
      event.preventDefault()
      setClicked(true)
    }
  }

  return (
    <div className="flex flex-col">
      <a href={href} onClick={onClick} className="project-link w-fit" target="_blank" rel="noreferrer">
        <i className={icon} aria-hidden="true" />
        <span>{label}</span>
      </a>
      {clicked && <span className="mt-1 text-xs text-text-muted">Replace placeholder with your real link.</span>}
    </div>
  )
}

function ProjectCard({ project, isOpen, onToggle }) {
  return (
    <Motion.article
      layout
      whileHover={{ y: -3 }}
      className="project-card group rounded-xl border border-border/70 bg-white p-5"
    >
      <div className="relative mb-4 h-44 overflow-hidden rounded-xl transition-all duration-500 group-hover:h-72">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <button
          type="button"
          className="absolute right-3 top-3 hidden translate-y-1 items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-text-primary opacity-0 shadow-sm transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100 lg:inline-flex"
        >
          <i className="fa-solid fa-circle-info" aria-hidden="true" />
          View Details
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs text-text-primary">{project.category}</span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs text-text-primary">{project.year}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-3xl leading-tight text-text-primary">{project.title}</h3>
        <i className="fa-solid fa-sparkles text-accent" aria-hidden="true" />
      </div>

      <p className="mt-3 text-text-secondary">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="project-tag">{tech}</span>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-all hover:border-accent hover:text-accent lg:hidden"
      >
        <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true" />
        {isOpen ? 'Hide Details' : 'View Details'}
      </button>

      <div className="hidden max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-[420px] group-hover:opacity-100 lg:block">
        <div className="border-t border-border pt-4">
          <p className="text-sm text-text-secondary">{project.details}</p>
          <div className="mt-3 grid gap-2 text-sm text-text-secondary">
            <p><strong className="text-text-primary">Scope:</strong> {project.scope}</p>
            <p><strong className="text-text-primary">Engagement:</strong> {project.engagement}</p>
            <p><strong className="text-text-primary">Outcome:</strong> {project.outcome}</p>
          </div>
          <div className="mt-4 flex gap-5">
            <PlaceholderLink href={project.repo} label="Repository" icon="fa-brands fa-github" />
            <PlaceholderLink href={project.live} label="Live Demo" icon="fa-solid fa-arrow-up-right-from-square" />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm text-text-secondary">{project.details}</p>
              <div className="mt-3 grid gap-2 text-sm text-text-secondary">
                <p><strong className="text-text-primary">Scope:</strong> {project.scope}</p>
                <p><strong className="text-text-primary">Engagement:</strong> {project.engagement}</p>
                <p><strong className="text-text-primary">Outcome:</strong> {project.outcome}</p>
              </div>
              <div className="mt-4 flex gap-5">
                <PlaceholderLink href={project.repo} label="Repository" icon="fa-brands fa-github" />
                <PlaceholderLink href={project.live} label="Live Demo" icon="fa-solid fa-arrow-up-right-from-square" />
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.article>
  )
}

export default function Projects() {
  const [mode, setMode] = useState('Featured')
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [openProjectId, setOpenProjectId] = useState(null)

  const visibleProjects = useMemo(() => {
    const base = mode === 'Featured' ? PROJECTS.filter((project) => project.featured) : PROJECTS
    return base.filter((project) => {
      const matchesFilter = filter === 'All' || project.category === filter
      const matchesQuery = `${project.title} ${project.summary} ${project.scope} ${project.stack.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [filter, mode, query])

  const featuredCount = PROJECTS.filter((project) => project.featured).length

  return (
    <Motion.section
      id="projects"
      className="px-6 py-24 md:px-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Projects</p>
            <h2 className="font-display text-4xl text-text-primary md:text-5xl">Selected Work With Strong Implementation Depth</h2>
            <p className="mt-4 text-text-secondary">
              Each project includes scope, engagement model, and outcome details for freelance clients.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode('Featured')}
              className={`filter-chip ${mode === 'Featured' ? 'filter-chip-active' : ''}`}
            >
              <i className="fa-solid fa-star mr-2" aria-hidden="true" />
              Featured ({featuredCount})
            </button>
            <button
              type="button"
              onClick={() => setMode('All')}
              className={`filter-chip ${mode === 'All' ? 'filter-chip-active' : ''}`}
            >
              <i className="fa-solid fa-folder-open mr-2" aria-hidden="true" />
              All Projects ({PROJECTS.length})
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by project name, stack, or keyword"
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`filter-chip filter-chip-sm ${filter === item ? 'filter-chip-active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-text-muted">{visibleProjects.length} project(s) shown</p>

        <Motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openProjectId === project.id}
              onToggle={() => setOpenProjectId((prev) => (prev === project.id ? null : project.id))}
            />
          ))}
        </Motion.div>

        {visibleProjects.length === 0 && (
          <div className="mt-8 rounded-xl border border-border bg-white p-6 text-text-secondary">
            No projects match this filter. Try another category or search term.
          </div>
        )}
      </div>
    </Motion.section>
  )
}
