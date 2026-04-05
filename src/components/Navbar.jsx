import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const LINKS = [
  { label: 'Home', href: '#top', section: 'top' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const [progress, setProgress] = useState(0)
  const sections = useMemo(() => LINKS.map((item) => item.section), [])

  useEffect(() => {
    const onScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0
      setProgress(nextProgress)

      let current = 'top'
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element && window.scrollY >= element.offsetTop - 140) {
          current = id
        }
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/85 backdrop-blur-md">
      <div className="h-[2px] w-full bg-transparent">
        <Motion.div
          className="h-full bg-gradient-to-r from-accent to-[#b38b56]"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#top" className="font-display text-3xl text-text-primary">
          Sachin
        </a>

        <div className="hidden md:flex items-center gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-pill ${active === link.section ? 'nav-pill-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a className="btn-primary ml-2" href="#contact">
            Let&apos;s Talk
          </a>
        </div>

        <button
          type="button"
          className="md:hidden rounded-md border border-border px-3 py-2 text-text-primary"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <Motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-border bg-surface px-6 py-5 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-text-secondary transition-colors hover:text-text-primary ${
                  active === link.section ? 'text-accent' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
              Let&apos;s Talk
            </a>
          </div>
        </Motion.div>
      )}
    </header>
  )
}

