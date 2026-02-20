import { Heart, Brain, Wind, ShieldCheck, Cpu, Eye } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Multi-Disease Detection",
    desc: "Analyze clinical parameters and medical images for heart disease, brain tumours, and lung conditions using advanced deep learning models.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Explainable AI Visualizations",
    desc: "See exactly what the AI detects with Grad-CAM heatmaps that highlight regions of interest, making predictions transparent and understandable.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Privacy-First Design",
    desc: "Your medical images are processed locally via your Streamlit server and never stored on external servers. Complete privacy for sensitive health data.",
  },
];

const assessments = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Coronary Artery Disease",
    color: "heart",
    accentClass: "heart-accent",
    borderClass: "heart-border",
    glowClass: "heart-glow",
    bgClass: "bg-[hsl(var(--heart)/0.1)]",
    desc: "Comprehensive cardiovascular risk assessment using 13 clinical parameters to predict heart disease probability.",
    features: ["ECG Analysis", "Blood Pressure Evaluation", "Cholesterol Assessment"],
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Brain Tumour Detection",
    color: "brain",
    accentClass: "brain-accent",
    borderClass: "brain-border",
    glowClass: "brain-glow",
    bgClass: "bg-[hsl(var(--brain)/0.1)]",
    desc: "Deep learning MRI scan analysis for detecting and classifying brain tumours with high precision.",
    features: ["Tumour Classification", "MRI Segmentation", "Malignancy Assessment"],
  },
  {
    icon: <Wind className="w-7 h-7" />,
    title: "Lung Disease Risk",
    color: "lung",
    accentClass: "lung-accent",
    borderClass: "lung-border",
    glowClass: "lung-glow",
    bgClass: "bg-[hsl(var(--lung)/0.1)]",
    desc: "AI-powered chest X-ray analysis for identifying pneumonia, opacity, and other respiratory pathologies.",
    features: ["Pneumonia Detection", "X-Ray Analysis", "Pathology Screening"],
  },
];

export default function FeaturesSection() {
  return (
    <>
      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Platform Features</h2>
            <p className="text-muted-foreground">Advanced AI technology combined with medical expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Risk Assessments */}
      <section className="py-10 px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Health Risk Assessments</h2>
            <p className="text-muted-foreground">Three specialized AI models for comprehensive health screening</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {assessments.map((a) => (
              <div key={a.title} className={`glass-card rounded-2xl p-6 border ${a.borderClass} hover:${a.glowClass} transition-all group`}>
                <div className={`w-12 h-12 rounded-xl ${a.bgClass} flex items-center justify-center ${a.accentClass} mb-4 group-hover:scale-110 transition-transform`}>
                  {a.icon}
                </div>
                <h3 className={`font-display font-bold text-foreground mb-2 ${a.accentClass}`}>{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{a.desc}</p>
                <ul className="space-y-1">
                  {a.features.map(feat => (
                    <li key={feat} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full`} style={{ background: `hsl(var(--${a.color}))` }} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
