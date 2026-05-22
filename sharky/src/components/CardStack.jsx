/**
 * CardStack.jsx — Scroll-driven stacking card section
 * -----------------------------------------------------
 * 7 cards, each 70vw × 70vh, centred in a sticky viewport.
 * Cards start offscreen (translateY: 100vh).
 *
 * As the user scrolls through the 500vh tall container,
 * cards slide up one-by-one into a stacked pile.
 * When the next card arrives, previous cards:
 *   - scale down incrementally (0.95, 0.90, 0.85 …)
 *   - shift up slightly  (–15px, –30px, –45px …)
 * — like a macOS Finder/folder stack.
 *
 * Each card is an individual sub-component (<Card />) so its
 * inner content can be easily edited later by dropping in
 * text, images, or other components.
 *
 * Uses IntersectionObserver + scroll listener for performance.
 */

import { useEffect, useRef, useCallback } from 'react';
import '../styles/CardStack.css';

/* ------------------------------------------------------------------ */
/* Card sub-component — edit content per-card here                     */
/* ------------------------------------------------------------------ */

/**
 * Card — A single card in the stack.
 * @param {number}  index    – 0-based card index
 * @param {string}  title    – Card heading
 * @param {string}  desc     – Card body text
 * @param {object}  ref      – forwarded ref for scroll transforms
 */
const Card = ({ index, title, desc, cardRef }) => (
  <div
    className={`card-stack__card card-stack__card--${index}`}
    ref={cardRef}
    style={{ zIndex: index + 1 }}  /* later cards sit on top */
  >
    <div className="card-stack__card-inner">
      {/* Background image placeholder */}
      <div className="card-stack__card-bg img-placeholder">
        Card {index + 1} image
      </div>

      {/* Large decorative number */}
      <span className="card-stack__card-number">0{index + 1}</span>

      {/* Editable text content — swap these props for real content later */}
      <h3 className="card-stack__card-title">{title}</h3>
      <p className="card-stack__card-desc">{desc}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Placeholder data for each of the 7 cards                            */
/* ------------------------------------------------------------------ */
const CARDS = [
  { title: 'Project One',   desc: 'Placeholder description for the first project. Edit content, add images, and customise styling.' },
  { title: 'Project Two',   desc: 'Placeholder description for the second project. Showcase your best photography or design work.' },
  { title: 'Project Three', desc: 'Placeholder description for the third project. Highlight key creative decisions and outcomes.' },
  { title: 'Project Four',  desc: 'Placeholder description for the fourth project. Let the visuals tell the story.' },
  { title: 'Project Five',  desc: 'Placeholder description for the fifth project. Include behind-the-scenes process shots.' },
  { title: 'Project Six',   desc: 'Placeholder description for the sixth project. Add client testimonials or awards.' },
  { title: 'Project Seven', desc: 'Placeholder description for the seventh project. Wrap up with your most recent or favourite piece.' },
];

/* ------------------------------------------------------------------ */
/* Main CardStack component                                            */
/* ------------------------------------------------------------------ */

const CardStack = () => {
  /** Ref to the 500vh scroll container */
  const containerRef = useRef(null);
  /** Array of refs — one for each card DOM element */
  const cardRefs = useRef([]);

  /**
   * handleScroll — drives card transforms based on scroll progress.
   *
   * Slower reveal: each card occupies ~12% of scroll range (0.85/7 ≈ 0.12)
   * with a generous slide-in window so the entrance feels deliberate.
   *
   * Stack behaviour:
   *   - When the next card arrives, previous cards scale down (–3% per layer)
   *     and shift UP by 30px per layer so their top rounded edge stays visible
   *     beneath the current card.
   *   - All cards remain visible until the user scrolls back past their
   *     individual threshold — they're only hidden when progress drops below
   *     their arriveStart.
   */
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    /* Normalised scroll progress 0 → 1 */
    const scrolled = -rect.top;
    const totalScrollable = containerHeight - viewportHeight;
    const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

    const total = CARDS.length;
    /* Spread cards across 85% of scroll, leaving 15% padding at the end */
    const scrollRange = 0.85;
    /* Each card's slide-in duration as a fraction of progress */
    const slideDuration = scrollRange / total;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      /* Each card's individual arrival window */
      const arriveStart = (i * scrollRange) / total;
      /* Slower entrance — card takes its full slice to finish sliding */
      const arriveEnd   = arriveStart + slideDuration * 0.85;

      if (progress < arriveStart) {
        /* Card hasn't entered yet — off-screen below */
        card.style.transform = 'translateY(100vh) scale(1)';
        card.style.opacity = '0';
      } else if (progress < arriveEnd) {
        /* Card is currently sliding in — use eased interpolation */
        const raw = (progress - arriveStart) / (arriveEnd - arriveStart);
        /* Smooth ease-out curve for more natural deceleration */
        const eased = 1 - Math.pow(1 - raw, 3);
        const yOffset = (1 - eased) * 100;  // 100vh → 0
        card.style.transform = `translateY(${yOffset}vh) scale(1)`;
        card.style.opacity = String(Math.min(eased * 1.5, 1));
      } else {
        /* Card has arrived — apply stack compression from later cards */
        /* Count how many cards have fully arrived AFTER this one */
        let cardsAbove = 0;
        for (let j = i + 1; j < total; j++) {
          const jEnd = ((j * scrollRange) / total) + slideDuration * 0.85;
          if (progress >= jEnd) cardsAbove++;
        }

        /* Scale down 3% per card stacked above (gentle compression) */
        const scale = Math.max(1 - cardsAbove * 0.03, 0.78);
        /* Shift up 30px per card above — exposes the top rounded border */
        const yShift = -cardsAbove * 30;

        card.style.transform = `translateY(${yShift}px) scale(${scale})`;
        card.style.opacity = '1';
      }
    });
  }, []);

  /**
   * IntersectionObserver — attach/detach scroll handler
   * only while this section is visible.
   */
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
    <section className="card-stack" ref={containerRef} id="card-stack">
      {/* Sticky panel — viewport-sized window for the card pile */}
      <div className="card-stack__sticky">

        {/* Cutting-mat backdrop — sits between navy bg and cards */}
        <div className="card-stack__mat">
          {/* Section heading pinned to top-centre of the mat */}
          <h2 className="card-stack__mat-heading">My Work</h2>
        </div>

        {CARDS.map((card, i) => (
          <Card
            key={i}
            index={i}
            title={card.title}
            desc={card.desc}
            cardRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
};

export default CardStack;
