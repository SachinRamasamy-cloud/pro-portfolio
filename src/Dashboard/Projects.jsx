import { useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Job Portal Platform',
    year: 2026,
    featured: true,
    category: 'MERN',
    summary: 'Role-based job portal with recruiter and candidate workflows.',
    details:
      'Implemented authentication flow, profile management, and filtered job listings with pagination.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 2,
    title: 'Learning Management UI',
    year: 2026,
    featured: true,
    category: 'Frontend',
    summary: 'Dashboard-style learning interface with progress tracking.',
    details:
      'Built reusable components, responsive layout system, and state-based learning progress cards.',
    stack: ['React', 'JavaScript', 'Tailwind', 'MUI'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 3,
    title: 'E-Commerce Storefront',
    year: 2025,
    featured: true,
    category: 'MERN',
    summary: 'Product browsing and cart flow with clean user journeys.',
    details:
      'Created product listing UI, category filters, cart state handling, and checkout page interactions.',
    stack: ['React', 'Node.js', 'MongoDB', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 4,
    title: 'Task Tracking App',
    year: 2025,
    featured: false,
    category: 'Frontend',
    summary: 'Task manager with priority, status updates, and search.',
    details:
      'Implemented client-side task operations, search filtering, and compact interaction-driven UI.',
    stack: ['React', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 5,
    title: 'Inventory API Service',
    year: 2026,
    featured: false,
    category: 'Backend',
    summary: 'REST API for inventory modules with validation patterns.',
    details:
      'Built structured API routes, request validation, and error response formatting for stable frontend consumption.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 6,
    title: 'Portfolio Generator Prototype',
    year: 2026,
    featured: false,
    category: 'Frontend',
    summary: 'Template-driven portfolio page builder concept.',
    details:
      'Created section configuration flow and dynamic rendering model to produce customizable layouts quickly.',
    stack: ['React', 'Tailwind', 'Figma'],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
  {
    id: 7,
    title: 'Python Utility Scripts',
    year: 2025,
    featured: false,
    category: 'Python',
    summary: 'Automation scripts for file handling and data cleanup.',
    details:
      'Built small utilities to automate repetitive dev tasks and speed up data preparation workflows.',
    stack: ['Python'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    repo: '#repo-placeholder',
    live: '#live-placeholder',
  },
]

const FILTERS = ['All', 'MERN', 'Frontend', 'Backend', 'Python']

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
      <div className="relative mb-4 h-44 overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
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
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-all hover:border-accent hover:text-accent"
      >
        <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true" />
        {isOpen ? 'Hide Details' : 'View Details'}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm text-text-secondary">{project.details}</p>
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
      const matchesQuery = `${project.title} ${project.summary} ${project.stack.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [filter, mode, query])

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
              Explore featured projects, switch categories, search fast, and open implementation details directly inside each card.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode('Featured')}
              className={`filter-chip ${mode === 'Featured' ? 'filter-chip-active' : ''}`}
            >
              <i className="fa-solid fa-star mr-2" aria-hidden="true" />
              Featured (3)
            </button>
            <button
              type="button"
              onClick={() => setMode('All')}
              className={`filter-chip ${mode === 'All' ? 'filter-chip-active' : ''}`}
            >
              <i className="fa-solid fa-folder-open mr-2" aria-hidden="true" />
              All Projects (7)
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

