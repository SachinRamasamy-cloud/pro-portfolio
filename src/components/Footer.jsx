export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
        <p>&copy; {new Date().getFullYear()} Sachin. Built with React, Tailwind CSS, and Three.js.</p>
        <a className="transition-colors hover:text-text-primary" href="#top">Back to top</a>
      </div>
    </footer>
  )
}
