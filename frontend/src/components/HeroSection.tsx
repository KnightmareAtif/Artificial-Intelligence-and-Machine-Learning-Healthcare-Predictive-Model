import heroBg from "@/assets/hero-bg.jpg";
import { Activity, ChevronDown, Shield } from "lucide-react";

interface HeroSectionProps {
  onStartAnalysis: () => void;
}

export default function HeroSection({ onStartAnalysis }: HeroSectionProps) {
  const scrollToPanel = () => {
    document.getElementById("diagnosis")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          AI-Powered Medical Screening Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
          Health<span className="text-gradient">Guard</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
          Advanced deep learning models for Heart Disease, Brain Tumour, and Lung Disease screening
        </p>
        <p className="text-sm text-muted-foreground/60 mb-10">
          Powered by clinical-grade machine learning • Connected to Streamlit model servers
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartAnalysis}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 glow-primary"
            style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}
          >
            <Activity className="w-4 h-4" />
            Start Analysis
          </button>
          <button
            onClick={scrollToPanel}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border border-border bg-card/60 text-foreground hover:bg-card hover:border-primary/40 transition-all backdrop-blur-sm"
          >
            <ChevronDown className="w-4 h-4" />
            View Assessments
          </button>
        </div>

        {/* Disclaimer Card */}
        <div className="glass-card rounded-xl p-4 max-w-xl mx-auto text-left border border-border/60">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Medical Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                HealthGuard is an educational and research tool designed to demonstrate AI capabilities in medical imaging.
                This platform is <strong className="text-foreground">NOT</strong> intended for clinical diagnosis, treatment decisions, or patient care.
                Always consult qualified healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToPanel}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
