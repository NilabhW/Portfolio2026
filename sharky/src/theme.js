/**
 * theme.js — Central design-token store
 * -----------------------------------------
 * Every colour and spacing value used anywhere in the app
 * MUST be imported from here. Zero hardcoded hex values elsewhere.
 *
 * CSS variables are also injected via global.css :root — this file
 * is the single-source-of-truth JavaScript mirror so components
 * can reference tokens in inline styles or JS logic when needed.
 */

const theme = {
  /* ---- Colour Palette ---- */
  colors: {
    antiqueWhite:  '#FCE9D2',
    pinkLavender:  '#F3C8F3',
    tangerine:     '#FD9651',
    cinnabar:      '#EF512C',
    cerise:        '#E22797',
    dark:          '#1a1a1a',
    white:         '#ffffff',
    /* Card-stack section */
    navyLight:     '#2b3a67',
    /* Card-specific colours */
    cardDarkPurple: '#3a1d6e',
    cardLeafGreen:  '#7ec879',
    cardPink:       '#f5a5c8',
    cardDeepRed:    '#8b1a2b',
    cardSageGreen:  '#b2c9ab',
  },

  /* ---- Spacing Scale (px) ---- */
  spacing: {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  32,
    xl:  64,
    xxl: 128,
  },

  /* ---- Easing Curves ---- */
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth:  'ease-in-out',
  },

  /* ---- Breakpoints ---- */
  breakpoints: {
    mobile: 768,
  },
};

export default theme;
