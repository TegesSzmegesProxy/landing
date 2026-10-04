import { MotionConfig } from 'motion/react';
import { dashboardUrl, skipLink } from './data/content';
import { Bento } from './components/Bento';
import { DemoPage } from './components/demo/DemoPage';
import { Flow } from './components/Flow';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Jev } from './components/Jev';
import { PolicySection } from './components/PolicySection';
import { Pricing } from './components/Pricing';

const openDeploy = () => window.location.assign(dashboardUrl);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-(--radius-pill) focus:bg-ink-900 focus:text-bone-100 focus:no-underline"
      >
        {skipLink}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero onDeploy={openDeploy} />
        <Flow />
        <PolicySection />
        <Jev />
        <DemoPage onDeploy={openDeploy} />
        <Bento />
        <Pricing onDeploy={openDeploy} />
      </main>
      <Footer />
    </MotionConfig>
  );
}
