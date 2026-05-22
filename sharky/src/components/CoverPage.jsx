/**
 * CoverPage.jsx — Hero landing section
 * ----------------------------------------
 * Layout inspired by a modern designer portfolio:
 *  - Top nav bar: dot + name placeholder | menu pill
 *  - Three-column body: intro text | oval portrait placeholder | stats
 *  - Bottom strip: 4 feature columns
 *
 * All text is placeholder — replace with real content.
 * No person photo — oval is an empty styled placeholder.
 */

import '../styles/CoverPage.css';
import chatgptImg from '../../images/chatgpt.png';

/* ── Stats data (right column) ── */
const STATS = [
  { value: '3+',   label: 'Years Experience' },
  { value: '20+',  label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '10+',  label: 'Clients Worldwide' },
];

/* ── Bottom feature strip ── */
const FEATURES = [
  { title: 'Brand Identity',        desc: 'Crafting visual identities that are bold, cohesive, and unforgettable.' },
  { title: 'Poster & Print Design', desc: 'Typographic compositions that command the room.' },
  { title: 'Digital Illustration',  desc: 'Vector art and editorial visuals that tell stories.' },
  { title: 'Concept & Research',    desc: 'Strategic thinking that grounds every creative decision.' },
];

const CoverPage = () => {
  return (
    <section className="cover-page" id="cover">

      {/* ── Top navigation bar ── */}
      <nav className="cover-nav">
        <div className="cover-nav__brand">
          <span className="cover-nav__dot" />
          {/* Replace with your name */}
          <span className="cover-nav__name">YOUR NAME</span>
        </div>
        <button className="cover-nav__menu" aria-label="Open menu">
          MENU
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1.5" x2="18" y2="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="7"   x2="18" y2="7"   stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="12.5" x2="18" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* ── Main three-column body ── */}
      <div className="cover-body">

        {/* Left: intro text */}
        <div className="cover-left">
          {/* Replace "Hey, I'm [Name]," with your own greeting */}
          <p className="cover-left__greeting">Hey, I'm <em>[Your Name],</em></p>
          <h1 className="cover-left__heading">
            A Design<br />
            <em>&amp; Brand</em><br />
            <strong>Student</strong>
          </h1>
          <p className="cover-left__desc">
            {/* Replace with your personal tagline / bio */}
            Transforming ideas into stunning visuals — brand design and visual storytelling that captivates and delivers results.
          </p>
          <a href="#contact" className="cover-left__cta">
            CONTACT ME
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 H13 M8 3 L13 8 L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Centre: portrait oval placeholder */}
        <div className="cover-centre">
          <div className="cover-portrait">
            <img src={chatgptImg} alt="ChatGPT" className="cover-portrait__img" />
          </div>
        </div>

        {/* Right: stats */}
        <div className="cover-right">
          {STATS.map((stat) => (
            <div className="cover-stat" key={stat.label}>
              <span className="cover-stat__value">{stat.value}</span>
              <span className="cover-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom feature strip ── */}
      <div className="cover-features">
        {FEATURES.map((feat) => (
          <div className="cover-feature" key={feat.title}>
            <h3 className="cover-feature__title">{feat.title}</h3>
            <p className="cover-feature__desc">{feat.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default CoverPage;
