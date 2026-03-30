import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  // Dummy data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative project management tool featuring Kanban boards, team assignments, and automated progress tracking.",
      tech: ["TypeScript", "Express", "PostgreSQL", "Socket.io"],
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "A SaaS application leveraging OpenAI's API to generate marketing copy, blog posts, and social media content seamlessly.",
      tech: ["Next.js", "Tailwind", "OpenAI", "Prisma"],
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15, mass: 1 }
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-bg min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl text-text-primary font-medium mb-4">
            Featured Projects
          </h2>
          <p className="font-body text-text-secondary text-lg">
            A selection of my recent work, highlighting full-stack development, system architecture, and scalable design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex flex-col bg-surface-elevated border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-shadow duration-500"
            >
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden bg-surface border-b border-border">
                {/* Overlay that clears on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-2xl font-medium text-text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-text-secondary mb-6 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-surface text-text-secondary text-xs font-mono rounded-md border border-border/50 cursor-default hover:text-accent hover:border-accent/30 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links Footer */}
                <div className="flex items-center gap-6 mt-auto pt-5 border-t border-border/40">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4, color: '#8B6F47' }} // Matches your accent color
                    whileTap={{ scale: 0.95 }}
                    className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2 font-body text-sm font-medium"
                  >
                    <i className="fa-brands fa-github text-lg"></i>
                    Source
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4, color: '#8B6F47' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2 font-body text-sm font-medium"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                    Preview
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
