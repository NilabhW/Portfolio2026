/**
 * CameraShowcase.jsx — Skills Showcase section
 * ---------------------------------------------
 * Scroll-driven skills reveal for a design student portfolio.
 *
 * Structure:
 *  - 300vh tall scroll container with sticky 100vh panel
 *  - Left: large serif heading + tagline + tool icons
 *  - Right: 5 skill cards that stagger in on scroll
 *  - Below sticky: horizontal marquee strip + tools row
 */

import { useEffect, useRef, useCallback } from 'react';
import '../styles/CameraShowcase.css';

/* ─────────────────────────────────────────────
   Skill card data
───────────────────────────────────────────── */
const SKILLS = [
  {
    id: 'brand-design',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" stroke="#111" strokeWidth="1.5" />
        <path d="M16 32 L24 16 L32 32" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 27 H29.5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Brand Design',
    desc: 'Cohesive visual systems — colour, type, and tone working as one.',
  },
  {
    id: 'logo-design',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 10 L28 20 H38 L30 26 L33 37 L24 31 L15 37 L18 26 L10 20 H20 Z" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Logo Design',
    desc: 'Marks that are memorable, scalable, and true to the brand story.',
  },
  {
    id: 'illustration',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36 C16 20, 24 14, 36 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="12" r="4" stroke="#111" strokeWidth="1.5" />
        <path d="M18 30 Q24 22 32 20" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" />
      </svg>
    ),
    title: 'Digital Illustration',
    desc: 'Vector art and editorial compositions that communicate beyond words.',
  },
  {
    id: 'product-design',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="32" height="22" rx="4" stroke="#111" strokeWidth="1.5" />
        <path d="M20 34 L18 38 H30 L28 34" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="20" r="3" stroke="#111" strokeWidth="1.2" />
        <rect x="24" y="18" width="10" height="2" rx="1" fill="#111" fillOpacity="0.35" />
        <rect x="24" y="22" width="7" height="2" rx="1" fill="#111" fillOpacity="0.35" />
      </svg>
    ),
    title: 'Product Design',
    desc: 'User-centred interfaces and experiences that are intuitive and delightful.',
  },
  {
    id: 'poster',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="6" width="28" height="36" rx="2" stroke="#111" strokeWidth="1.5" />
        <path d="M16 16 H32" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 22 H28" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 28 H24" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="16" y="9" width="8" height="5" rx="0.5" fill="#111" fillOpacity="0.12" stroke="#111" strokeWidth="1" />
      </svg>
    ),
    title: 'Poster Design',
    desc: 'Typographic compositions that command attention in print and digital.',
  },
  {
    id: 'research',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="11" stroke="#111" strokeWidth="1.5" />
        <path d="M29 29 L38 38" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 21 H26" stroke="#111" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M21 16 V26" stroke="#111" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Research & Ideation',
    desc: 'Brand research and conceptual thinking that grounds creative decisions.',
  },
];

/* ─────────────────────────────────────────────
   Tool icons
───────────────────────────────────────────── */
const TOOLS = [
  {
    name: 'Photoshop',
    color: '#001E36',
    abbr: 'Ps',
    accentColor: '#31A8FF',
  },
  {
    name: 'Illustrator',
    color: '#330000',
    abbr: 'Ai',
    accentColor: '#FF9A00',
  },
  {
    name: 'Canva',
    color: '#7D2AE8',
    abbr: 'Cv',
    accentColor: '#ffffff',
  },
  {
    name: 'Premiere Pro',
    color: '#00005B',
    abbr: 'Pr',
    accentColor: '#9999FF',
  },
];

/* ─────────────────────────────────────────────
   Marquee keywords
───────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Branding', '✦', 'Poster Design', '✦', 'Typography', '✦',
  'UI/UX', '✦', 'Illustration', '✦', 'Visual Identity', '✦',
  'Editorial', '✦', 'Motion', '✦', 'Art Direction', '✦',
  'Packaging', '✦', 'Lettering', '✦', 'Print Design', '✦',
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const CameraShowcase = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrolled = -rect.top;
    const totalScrollable = containerHeight - viewportHeight;
    const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

    /* Heading slides in early */
    if (headingRef.current) {
      const headingProgress = Math.min(progress / 0.15, 1);
      const eased = 1 - Math.pow(1 - headingProgress, 3);
      headingRef.current.style.opacity = String(eased);
      headingRef.current.style.transform = `translateY(${(1 - eased) * 40}px)`;
    }

    /* Skill cards stagger in */
    const cardStart = 0.1;
    const cardSpan = 0.6;
    const stagger = cardSpan / SKILLS.length;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const threshold = cardStart + i * stagger;
      const raw = Math.min(Math.max((progress - threshold) / stagger, 0), 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      card.style.opacity = String(eased);
      card.style.transform = `translateY(${(1 - eased) * 50}px)`;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className="skills-showcase" ref={containerRef} id="skills">

      {/* ── Sticky panel ── */}
      <div className="skills-showcase__sticky">
        <div className="skills-showcase__inner">

          {/* Left column */}
          <div className="skills-showcase__left" ref={headingRef} style={{ opacity: 0 }}>
            <span className="skills-showcase__label">02 — Skills</span>
            <h2 className="skills-showcase__heading">
              What<br />I <em>do.</em>
            </h2>
            <p className="skills-showcase__tagline">
              A multidisciplinary design student passionate about visual communication, brand storytelling, and crafting experiences that resonate.
            </p>

            {/* Tool icons */}
            <div className="skills-showcase__tools">
              {TOOLS.map((tool) => (
                <div className="skills-tool" key={tool.name}>
                  <div
                    className="skills-tool__icon"
                    style={{ background: tool.color }}
                  >
                    <span style={{ color: tool.accentColor }}>{tool.abbr}</span>
                  </div>
                  <span className="skills-tool__name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — 3×2 skill grid */}
          <div className="skills-showcase__right">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.id}
                className="skill-card"
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                <div className="skill-card__icon">{skill.icon}</div>
                <h3 className="skill-card__title">{skill.title}</h3>
                <p className="skill-card__desc">{skill.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="skills-marquee">
        <div className="skills-marquee__track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="skills-marquee__item">{item}</span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CameraShowcase;
