import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { skipLink } from './data/content';
import { Bento } from './components/Bento';
import { DeployDialog } from './components/DeployDialog';
import { Flow } from './components/Flow';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Jev } from './components/Jev';
import { PolicySection } from './components/PolicySection';
import { Pricing } from './components/Pricing';

export default function App() {
  const [deployOpen, setDeployOpen] = useState(false);
  const openDeploy = useCallback(() => setDeployOpen(true), []);
  const closeDeploy = useCallback(() => setDeployOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-(--radius-pill) focus:bg-ink-900 focus:text-bone-100 focus:no-underline"
      >
        {skipLink}
      </a>
      <Header onDeploy={openDeploy} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero onDeploy={openDeploy} />
        <Flow />
        <PolicySection />
        <Jev />
        <Bento />
        <Pricing onDeploy={openDeploy} />
      </main>
      <Footer onDeploy={openDeploy} />
      <DeployDialog open={deployOpen} onClose={closeDeploy} />
    </MotionConfig>
  );
}
