import { AlertTriangle, CheckCircle } from "lucide-react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      <div className="glass-card rounded-2xl max-w-lg w-full p-8 animate-fade-up border border-border/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-foreground">Medical Disclaimer</h2>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground mb-6">
          <p className="text-foreground font-medium">
            <span className="text-yellow-400">Important Notice:</span> HealthGuard AI is an educational and screening tool designed for research and informational purposes only.
          </p>

          <div>
            <p className="font-semibold text-foreground mb-2">This platform is NOT:</p>
            <ul className="space-y-1 ml-4">
              {["A diagnostic medical device", "A substitute for professional medical advice", "Approved for clinical use or treatment decisions", "A replacement for proper medical examination"].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-2">What you should do:</p>
            <ul className="space-y-1 ml-4">
              {["Always consult qualified healthcare professionals for medical concerns", "Seek immediate medical attention for urgent symptoms", "Discuss any health concerns with your physician", "Use results only as a general screening indicator"].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-lung mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs border-t border-border pt-4">
            By continuing, you acknowledge that you understand this disclaimer and agree to use this platform for educational purposes only. You understand that any health decisions should be made in consultation with qualified medical professionals.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all"
          style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}
        >
          I Understand — Continue to Assessment
        </button>
      </div>
    </div>
  );
}
