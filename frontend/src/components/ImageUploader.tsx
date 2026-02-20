import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  type: "brain" | "lung";
  streamlitUrl: string;
}

const config = {
  brain: {
    label: "MRI Scan",
    accept: "image/*",
    hint: "Upload a brain MRI image (JPEG, PNG, DICOM)",
    color: "brain",
    borderClass: "brain-border",
    glowClass: "brain-glow",
    accentClass: "brain-accent",
    bgClass: "bg-[hsl(var(--brain)/0.1)]",
  },
  lung: {
    label: "Chest X-Ray",
    accept: "image/*",
    hint: "Upload a chest X-ray image (JPEG, PNG, DICOM)",
    color: "lung",
    borderClass: "lung-border",
    glowClass: "lung-glow",
    accentClass: "lung-accent",
    bgClass: "bg-[hsl(var(--lung)/0.1)]",
  },
};

export default function ImageUploader({ type, streamlitUrl }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: string; confidence: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cfg = config[type];

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setFileName(file.name);
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!image || !fileRef.current?.files?.[0]) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      const response = await fetch(`${streamlitUrl}/predict`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Model server error. Make sure Streamlit app is running.");
      const data = await response.json();
      setResult({ prediction: data.prediction ?? data.class ?? "Unknown", confidence: data.confidence ?? data.probability ?? "N/A" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to connect to model server. Please ensure Streamlit is running.");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setFileName("");
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-5">
      <input
        ref={fileRef}
        type="file"
        accept={cfg.accept}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {!image ? (
        <div
          className={`upload-zone ${dragging ? "border-primary bg-primary/5" : ""}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`w-16 h-16 rounded-2xl ${cfg.bgClass} flex items-center justify-center`}>
              <Upload className={`w-7 h-7 ${cfg.accentClass}`} />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Upload {cfg.label}</p>
              <p className="text-sm text-muted-foreground">{cfg.hint}</p>
              <p className="text-xs text-muted-foreground mt-2">Drag & drop or click to browse</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={image} alt="Medical scan" className="w-full max-h-72 object-contain bg-black" />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/80 flex items-center justify-center hover:bg-destructive transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm px-3 py-2">
            <div className="flex items-center gap-2">
              <ImageIcon className={`w-3.5 h-3.5 ${cfg.accentClass}`} />
              <span className="text-xs text-foreground truncate">{fileName}</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className={`glass-card rounded-xl p-5 border ${cfg.borderClass} ${cfg.glowClass}`}>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Analysis Result</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Prediction</p>
              <p className={`text-lg font-bold font-display ${cfg.accentClass}`}>{result.prediction}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Confidence</p>
              <p className="text-lg font-bold font-display text-foreground">{result.confidence}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!image || loading}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
        ) : (
          <>Analyze {cfg.label}</>
        )}
      </button>
    </div>
  );
}
