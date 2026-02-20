import { Heart, Brain, Wind, ExternalLink, ChevronRight } from "lucide-react";

type TabId = "heart" | "brain" | "lung";

const tabs: { id: TabId; label: string; icon: React.ReactNode; subtitle: string; accentClass: string; borderClass: string; glowClass: string; bgClass: string; color: string; description: string; features: string[]; url: string }[] = [
  {
    id: "heart",
    label: "Heart Disease",
    icon: <Heart className="w-6 h-6" />,
    subtitle: "11 Clinical Parameters",
    color: "heart",
    accentClass: "heart-accent",
    borderClass: "heart-border",
    glowClass: "heart-glow",
    bgClass: "bg-[hsl(var(--heart)/0.1)]",
    description: "Comprehensive cardiovascular risk assessment using 11 clinical parameters to predict heart disease probability.",
    features: ["ECG Analysis", "Blood Pressure Evaluation", "Cholesterol Assessment"],
    url: "https://healthguardheart.streamlit.app/",
  },
  {
    id: "brain",
    label: "Brain Tumour",
    icon: <Brain className="w-6 h-6" />,
    subtitle: "MRI Image Analysis",
    color: "brain",
    accentClass: "brain-accent",
    borderClass: "brain-border",
    glowClass: "brain-glow",
    bgClass: "bg-[hsl(var(--brain)/0.1)]",
    description: "Deep learning analysis of brain MRI scans to detect and classify tumour presence with high accuracy.",
    features: ["Tumour Detection", "Classification Analysis", "Grad-CAM Visualization"],
    url: "https://healthguardbrain.streamlit.app/",
  },
  {
    id: "lung",
    label: "Lung Disease",
    icon: <Wind className="w-6 h-6" />,
    subtitle: "Chest X-Ray Analysis",
    color: "lung",
    accentClass: "lung-accent",
    borderClass: "lung-border",
    glowClass: "lung-glow",
    bgClass: "bg-[hsl(var(--lung)/0.1)]",
    description: "AI-powered chest X-ray analysis to evaluate respiratory conditions and lung disease probability.",
    features: ["Pneumonia Detection", "Opacity Analysis", "Pathology Screening"],
    url: "https://healthguardlungs.streamlit.app/",
  },
];

export default function DiagnosisPanel() {
  return (
    <section id="diagnosis" className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            AI-Powered <span className="text-gradient">Health Assessments</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a condition below to launch the AI screening tool in your Streamlit application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tabs.map(tab => (
            <a
              key={tab.id}
              href={tab.url}
              target="_blank"
              rel="noreferrer"
              className={`glass-card rounded-2xl p-7 border ${tab.borderClass} hover:${tab.glowClass} hover:scale-[1.02] transition-all group cursor-pointer block`}
            >
              <div className={`w-14 h-14 rounded-2xl ${tab.bgClass} flex items-center justify-center ${tab.accentClass} mb-5 group-hover:scale-110 transition-transform`}>
                {tab.icon}
              </div>

              <h3 className={`font-display font-bold text-xl mb-1 ${tab.accentClass}`}>{tab.label}</h3>
              <p className="text-xs text-muted-foreground font-medium mb-3">{tab.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tab.description}</p>

              <ul className="space-y-1.5 mb-6">
                {tab.features.map(feat => (
                  <li key={feat} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ChevronRight className={`w-3 h-3 ${tab.accentClass}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <div
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all group-hover:opacity-90"
                style={{ background: `hsl(var(--${tab.color}) / 0.15)`, color: `hsl(var(--${tab.color}))`, border: `1px solid hsl(var(--${tab.color}) / 0.3)` }}
              >
                Open in Streamlit <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
