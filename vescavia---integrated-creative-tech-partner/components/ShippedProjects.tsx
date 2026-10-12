import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Blend, BrainCircuit, Check, LayoutDashboard, Network } from 'lucide-react';
import { hireReasons, shippedProjects, ShippedProject } from '../content/projects';
import OptimizedImage from './OptimizedImage';

const reasonIcons: Record<string, React.ReactNode> = {
  platforms: <Network size={20} />,
  ai: <BrainCircuit size={20} />,
  operators: <LayoutDashboard size={20} />,
  craft: <Blend size={20} />,
};

const ProjectCard: React.FC<{ project: ShippedProject; reverse: boolean }> = ({ project, reverse }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    aria-labelledby={`project-${project.id}`}
    className="glass grid grid-cols-1 overflow-hidden rounded-[2rem] lg:grid-cols-12"
  >
    {/* Product screenshot (links to the live product) */}
    <div
      className={`flex min-w-0 items-center bg-black/[0.02] p-4 dark:bg-white/[0.02] sm:p-6 md:p-8 lg:col-span-7 ${
        reverse ? 'lg:order-2' : ''
      }`}
    >
      <figure className="w-full">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} in a new tab`}
          className="group block overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-transform duration-500 hover:-translate-y-1 dark:ring-white/10"
        >
          {/* Decorative window chrome */}
          <span aria-hidden="true" className="flex items-center gap-1.5 border-b border-black/5 bg-gray-50 px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          </span>
          <OptimizedImage
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </a>
        <figcaption className="eyebrow mt-4 !text-[10px] text-gray-500 dark:text-gray-400">
          {project.image.caption}
        </figcaption>
      </figure>
    </div>

    {/* Story */}
    <div className="flex min-w-0 flex-col p-7 lg:col-span-5 lg:p-10">
      <p className="eyebrow mb-3 !text-[10px] text-accent-text">{project.category}</p>
      <h4
        id={`project-${project.id}`}
        className="text-3xl font-semibold leading-none tracking-[-0.03em] text-black dark:text-white md:text-4xl"
      >
        {project.name}
      </h4>
      <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">{project.pitch}</p>

      <ul className="mt-7 space-y-4">
        {project.highlights.map((point) => (
          <li key={point.title} className="flex gap-3.5">
            <span className="neo mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-accent-text">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-tight text-black dark:text-white">{point.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-gray-600 dark:text-gray-400">{point.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.modules.map((module) => (
          <span
            key={module}
            className="glass-pill eyebrow cursor-default rounded-full px-3 py-1.5 !text-[10px] !tracking-[0.1em] text-gray-600 dark:text-gray-300"
          >
            {module}
          </span>
        ))}
      </div>

      {project.proof && (
        <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {project.proof.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col">
                <dt className="eyebrow order-2 mt-1 !text-[9px] !tracking-[0.12em] text-gray-500 dark:text-gray-400">
                  {item.label}
                </dt>
                <dd className="text-gradient order-1 whitespace-nowrap text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          {project.proofNote && <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">{project.proofNote}</p>}
        </div>
      )}

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary group mt-8 self-start"
      >
        {project.cta}
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  </motion.article>
);

const GroupLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-6 flex items-center gap-2.5">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
    <span className="eyebrow text-accent-text">{children}</span>
  </div>
);

/**
 * Featured case study, shipped products and "why teams hire us". Rendered inside the Work
 * section so the "Work" nav item stays active while scrolling through it.
 */
const ShippedProjects: React.FC = () => {
  const featured = shippedProjects.filter((p) => p.featured);
  const others = shippedProjects.filter((p) => !p.featured);

  return (
    <div className="mb-16 md:mb-24">
      {featured.length > 0 && (
        <div className="mb-12 md:mb-16">
          <GroupLabel>Featured Case Study</GroupLabel>
          <div className="space-y-8 md:space-y-10">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} reverse={false} />
            ))}
          </div>
        </div>
      )}

      <GroupLabel>Shipped Products</GroupLabel>
      <div className="space-y-8 md:space-y-10">
        {others.map((project, index) => (
          // Alternate image side for rhythm; the featured card above sits image-left.
          <ProjectCard key={project.id} project={project} reverse={index % 2 === 0} />
        ))}
      </div>

      {/* Why teams hire us */}
      <div className="mt-16 md:mt-24">
        <div className="mb-8 flex flex-col gap-2 md:mb-10">
          <h3 className="text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
            Why teams hire <span className="text-gradient">Vescavia</span>
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
            Every point below is something you can see in the work above.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hireReasons.map((reason, i) => (
            <motion.li
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass glass-interactive flex flex-col rounded-3xl p-6"
            >
              <span className="neo mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-accent-text">
                {reasonIcons[reason.id]}
              </span>
              <h4 className="text-lg font-semibold leading-snug tracking-tight text-black dark:text-white">
                {reason.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{reason.text}</p>
              <p className="eyebrow mt-auto pt-5 !text-[10px] !tracking-[0.12em] text-accent-text">
                {reason.seenIn.length ? `Seen in: ${reason.seenIn.join(' · ')}` : 'Across every project'}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShippedProjects;
