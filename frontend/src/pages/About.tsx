import { Activity, Heart, Brain, Wind, ShieldCheck, Eye, Layout, Server, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground text-lg">HealthGuard</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <span className="text-sm text-primary font-medium">About</span>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
          AIML-<span className="text-gradient">HealthGuard</span>
        </h1>

        {/* Vision */}
        <section className="mt-10">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Our Vision
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AIML-HealthGuard is an integrated, web-based platform designed to address the fragmentation in modern healthcare AI. Our goal is to move beyond "black box" models by providing clinicians with transparent, interpretable, and multi-disease risk assessments in one centralized location.
          </p>
        </section>

        {/* Models */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Integrated Models & Performance
          </h2>
          <p className="text-muted-foreground mb-6">
            The platform hosts specialized models tailored for high-accuracy medical diagnostics:
          </p>
          <div className="space-y-5">
            <div className="glass-card rounded-xl p-5 border heart-border">
              <h3 className="font-display font-bold text-lg heart-accent flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5" /> Heart Disease (Coronary Artery Disease)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evaluates patient risk using a suite of machine learning algorithms including XGBoost, Random Forest, Decision Tree, and Logistic Regression. The XGBoost model is the primary engine, achieving an overall accuracy of <strong className="text-foreground">86.41%</strong>.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5 border lung-border">
              <h3 className="font-display font-bold text-lg lung-accent flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5" /> Lung Disease Detection
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizes ResNet50 for multi-class classification of chest X-rays (COVID-19, Normal, Viral Pneumonia, and Bacterial Pneumonia) with <strong className="text-foreground">80% test accuracy</strong>.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5 border brain-border">
              <h3 className="font-display font-bold text-lg brain-accent flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5" /> Brain Tumor Classification
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Employs the Xception architecture, optimized for stable and fine-grained spatial pattern recognition in MRI scans to distinguish between tumorous and non-tumorous tissues.
              </p>
            </div>
          </div>
        </section>

        {/* XAI */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Explainable AI (XAI) Framework
          </h2>
          <p className="text-muted-foreground mb-5">
            We believe trust is non-negotiable in medicine. AIML-HealthGuard integrates cutting-edge interpretability layers to make AI results actionable:
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass-card rounded-xl p-5 border border-border/60">
              <h3 className="font-display font-bold text-foreground mb-2">SHAP</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">SHapley Additive exPlanations</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For structured clinical data (like Heart Disease), SHAP provides intuitive visualizations to show exactly which factors, such as high cholesterol or age, influenced a specific prediction.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5 border border-border/60">
              <h3 className="font-display font-bold text-foreground mb-2">Grad-CAM Heatmaps</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Gradient-weighted Class Activation Mapping</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For image-based models (Lung and Brain), Grad-CAM highlights the specific regions within an X-ray or MRI that the AI focused on to reach its conclusion.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" /> Technical Architecture
          </h2>
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5 border border-border/60 flex items-start gap-4">
              <Layout className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Frontend</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Developed using Streamlit, providing a responsive and intuitive interface for medical professionals to enter data and view real-time results.
                </p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-5 border border-border/60 flex items-start gap-4">
              <Server className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Backend</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A modular, service-oriented Python architecture that ensures each disease model can be updated or replaced independently without affecting the entire platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-12">
          <div className="glass-card rounded-xl p-6 border border-destructive/30 bg-destructive/5">
            <h2 className="text-lg font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" /> Medical Disclaimer
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              HealthGuard AI is an educational and research tool designed to demonstrate AI capabilities in medical imaging and predictive analytics. This platform is <strong className="text-foreground">NOT</strong> intended for clinical diagnosis, treatment decisions, or patient care. Always consult with qualified healthcare professionals for medical advice.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">HealthGuard</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Educational research tool. Not for clinical use. Always consult qualified medical professionals for health decisions.
        </p>
      </footer>
    </div>
  );
};

export default About;
