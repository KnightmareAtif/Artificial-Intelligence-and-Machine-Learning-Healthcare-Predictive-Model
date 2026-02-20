import { useState } from "react";
import { Loader2 } from "lucide-react";

interface HeartFormProps {
  streamlitUrl: string;
}

const fields = [
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 54", min: 1, max: 120 },
  { name: "sex", label: "Sex", type: "select", options: [{ value: "1", label: "Male" }, { value: "0", label: "Female" }] },
  { name: "cp", label: "Chest Pain Type", type: "select", options: [{ value: "0", label: "Typical Angina" }, { value: "1", label: "Atypical Angina" }, { value: "2", label: "Non-Anginal Pain" }, { value: "3", label: "Asymptomatic" }] },
  { name: "trestbps", label: "Resting Blood Pressure (mmHg)", type: "number", placeholder: "e.g. 120", min: 50, max: 250 },
  { name: "chol", label: "Serum Cholesterol (mg/dL)", type: "number", placeholder: "e.g. 240", min: 100, max: 600 },
  { name: "fbs", label: "Fasting Blood Sugar > 120 mg/dL", type: "select", options: [{ value: "1", label: "True" }, { value: "0", label: "False" }] },
  { name: "restecg", label: "Resting ECG Results", type: "select", options: [{ value: "0", label: "Normal" }, { value: "1", label: "ST-T Wave Abnormality" }, { value: "2", label: "Left Ventricular Hypertrophy" }] },
  { name: "thalach", label: "Max Heart Rate Achieved", type: "number", placeholder: "e.g. 150", min: 60, max: 220 },
  { name: "exang", label: "Exercise Induced Angina", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
  { name: "oldpeak", label: "ST Depression (Exercise vs Rest)", type: "number", placeholder: "e.g. 1.0", step: "0.1", min: 0, max: 10 },
  { name: "slope", label: "Peak Exercise ST Segment Slope", type: "select", options: [{ value: "0", label: "Upsloping" }, { value: "1", label: "Flat" }, { value: "2", label: "Downsloping" }] },
  { name: "ca", label: "Major Vessels Colored by Fluoroscopy", type: "select", options: [{ value: "0", label: "0" }, { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
  { name: "thal", label: "Thalassemia", type: "select", options: [{ value: "1", label: "Normal" }, { value: "2", label: "Fixed Defect" }, { value: "3", label: "Reversible Defect" }] },
];

type FieldValues = Record<string, string>;

export default function HeartForm({ streamlitUrl }: HeartFormProps) {
  const [values, setValues] = useState<FieldValues>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ risk: string; probability: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setResult(null);
  };

  const isComplete = fields.every(f => values[f.name] !== undefined && values[f.name] !== "");

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload: Record<string, number> = {};
      fields.forEach(f => { payload[f.name] = parseFloat(values[f.name]); });
      
      const response = await fetch(`${streamlitUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Model server error. Make sure Streamlit app is running.");
      const data = await response.json();
      setResult({
        risk: data.prediction ?? data.risk ?? (data.result === 1 ? "High Risk" : "Low Risk"),
        probability: data.probability ?? data.confidence ?? "N/A",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to connect to model server. Please ensure Streamlit is running.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk.toLowerCase().includes("high")) return "text-heart";
    if (risk.toLowerCase().includes("low")) return "text-lung";
    return "text-primary";
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="medical-label">{field.label}</label>
            {field.type === "select" ? (
              <select
                className="medical-input"
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                className="medical-input"
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={(field as { step?: string }).step ?? "1"}
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="glass-card rounded-xl p-5 border heart-border heart-glow">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Heart Disease Risk Assessment</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
              <p className={`text-2xl font-bold font-display ${getRiskColor(result.risk)}`}>{result.risk}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Probability</p>
              <p className="text-2xl font-bold font-display text-foreground">{result.probability}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
            This result is for informational purposes only. Consult a cardiologist for professional evaluation.
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isComplete || loading}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Risk...</>
        ) : (
          <>Run Heart Disease Analysis</>
        )}
      </button>
    </div>
  );
}
