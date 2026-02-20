import { useState } from "react";
import DisclaimerModal from "@/components/DisclaimerModal";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DiagnosisPanel from "@/components/DiagnosisPanel";
import { Activity, Github } from "lucide-react";

const Index = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowDisclaimer(false);
    setTimeout(() => {
      document.getElementById("diagnosis")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleStartAnalysis = () => {
    if (!accepted) {
      setShowDisclaimer(true);
    } else {
      document.getElementById("diagnosis")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {showDisclaimer && <DisclaimerModal onAccept={handleAccept} />}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground text-lg">HealthGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#diagnosis" className="text-sm text-muted-foreground hover:text-primary transition-colors">Assessments</a>
          <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            Disclaimer
          </button>
        </div>
      </nav>

      <HeroSection onStartAnalysis={handleStartAnalysis} />
      
      <DiagnosisPanel />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">HealthGuard</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Educational research tool. Not for clinical use. Always consult qualified medical professionals for health decisions.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-3">
          Powered by Streamlit • Deep Learning Models • React Frontend
        </p>
      </footer>
    </div>
  );
};

export default Index;
