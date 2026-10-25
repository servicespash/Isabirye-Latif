import { CymaticLayout } from '../components/CymaticLayout';
import { JSONLD } from '../components/JSONLD';
import { DynamicAdInjector } from '../components/DynamicAdInjector';

export const Learning = () => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Professional Mastery Trajectory",
    "description": "Continuous evolution of skills across counseling, human resources, and technical architecture.",
    "provider": {
      "@type": "Organization",
      "name": "Cymatic Engines Evolution"
    }
  };

  return (
    <CymaticLayout>
      <JSONLD schema={courseSchema} />
      <div id="learning-content-container" className="space-y-16">
        <section className="pt-10">
          <h2 className="font-mono text-[var(--color-accent)] text-[10px] tracking-[0.3em] uppercase mb-6">// MASTER_TRAJECTORY</h2>
          <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-[var(--color-text-primary)] mb-10">
            Professional<br/>
            <span className="text-[var(--color-text-secondary)] italic">Mastery.</span>
          </h1>
          <p className="font-sans text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
            A continuous evolution of skills across counseling, human resources, and technical architecture.
          </p>
        </section>

        <section className="space-y-16 border-l border-[var(--color-border)] pl-10 ml-2">
          <div className="relative">
            <div className="absolute -left-[46px] top-1 w-4 h-4 rounded-full bg-[var(--color-accent)]" />
            <div className="text-[var(--color-accent)] font-mono text-[10px] mb-4 tracking-[0.2em] uppercase">2026 - Present</div>
            <h3 className="font-serif text-3xl mb-4 text-[var(--color-text-primary)]">Counselling Diploma</h3>
            <p className="font-sans text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg">Advanced focus on psychological support and professional human relations, grounding my technical work in human empathy.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[46px] top-1 w-4 h-4 rounded-full bg-[var(--color-text-secondary)]" />
            <div className="text-[var(--color-text-secondary)] font-mono text-[10px] mb-4 tracking-[0.2em] uppercase">2023 - 2025</div>
            <h3 className="font-serif text-3xl mb-4 text-[var(--color-text-primary)]">Human Resources Certification</h3>
            <p className="font-sans text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg">Foundational studies in organizational management and professional ethics.</p>
          </div>
        </section>
      </div>

      {/* Modular DOM-scanning Ad Insertion Engine */}
      <DynamicAdInjector 
        containerId="learning-content-container" 
        targetTag="p" 
        frequency={1} 
        label="//_MODULAR_LEARNING_MONETIZATION" 
      />
    </CymaticLayout>
  );
};

export default Learning;
