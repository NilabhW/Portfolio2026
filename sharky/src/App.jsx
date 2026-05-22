/**
 * App.jsx — Root application component
 * --------------------------------------
 * Imports and renders all four portfolio sections in order:
 *   1. CoverPage      – Full-viewport hero image
 *   2. CameraShowcase  – Scroll-driven camera + content boxes
 *   3. CardStack       – Scroll-driven stacking project cards
 *   4. ContactPage     – "Let's Connect" contact section
 *
 * No routing — single-page layout driven entirely by scroll.
 */

import CoverPage from './components/CoverPage';
import CameraShowcase from './components/CameraShowcase';
import CardStack from './components/CardStack';
import ContactPage from './components/ContactPage';

const App = () => {
  return (
    <>
      {/* Section 1: Full-viewport cover image */}
      <CoverPage />

      {/* Section 2: Scroll-driven camera showcase with info boxes */}
      <CameraShowcase />

      {/* Section 3: Scroll-driven stacking project cards */}
      <CardStack />

      {/* Section 4: Contact / social links */}
      <ContactPage />
    </>
  );
};

export default App;
