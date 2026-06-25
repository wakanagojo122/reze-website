import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, RotateCcw, Image, FileText, Video, Sparkles, Check, AlertCircle, CloudUpload, ChevronUp, ChevronDown } from "lucide-react";
import { EditableContent } from "../types";

interface ImageFieldUploaderProps {
  label: string;
  fieldKey: keyof EditableContent;
  value: string;
  onChange: (field: keyof EditableContent, value: string) => void;
}

function ImageFieldUploader({ label, fieldKey, value, onChange }: ImageFieldUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          const img = new window.Image();
          img.src = e.target.result;
          img.onload = () => {
            // Compress and resize image to fit comfortably within localStorage limit (max dimension 1200px, 0.75 quality)
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            const MAX_SIZE = 1200;

            if (width > height) {
              if (width > MAX_SIZE) {
                height = Math.round((height * MAX_SIZE) / width);
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width = Math.round((width * MAX_SIZE) / height);
                height = MAX_SIZE;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Compress to space-saving JPEG
              const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
              onChange(fieldKey, compressedBase64);
            } else {
              onChange(fieldKey, e.target!.result as string);
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2 border border-white/5 bg-zinc-900/30 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="block text-[10px] font-mono text-white/60 uppercase tracking-wider font-bold">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[8px] font-mono text-red-400 hover:text-red-300 uppercase tracking-wider flex items-center space-x-1"
        >
          <span>{showUrlInput ? "« Use File Upload" : "Or Paste URL Link »"}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            placeholder="Paste direct https:// image link..."
            onChange={(e) => onChange(fieldKey, e.target.value)}
            className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-mono text-white/80 outline-none"
          />
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-4 transition-all flex flex-col items-center justify-center cursor-pointer text-center ${
            dragActive
              ? "border-red-500 bg-red-950/20"
              : "border-white/10 hover:border-white/20 bg-black/40"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <CloudUpload className="w-6 h-6 text-white/40 mb-2" />
          <p className="text-[10px] text-white/80 font-medium">
            Drag & drop or <span className="text-red-500 underline font-bold">click to upload</span>
          </p>
          <p className="text-[8px] text-white/40 mt-1 uppercase tracking-wider font-mono">
            JPG, PNG, GIF or WEBP
          </p>
        </div>
      )}

      {value && value !== "/your-image-here.jpg" && (
        <div className="relative h-16 rounded overflow-hidden border border-white/5 bg-zinc-900 mt-2 flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <img src={value} alt="Preview" className="w-12 h-12 object-cover rounded border border-white/10 animate-fade-in" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/60">ACTIVE IMAGE</span>
              <span className="text-[8px] font-mono text-white/30 truncate max-w-[200px] sm:max-w-[300px]">
                {value.startsWith("data:") ? "Local File Uploaded (Base64)" : value}
              </span>
            </div>
          </div>
          <span className="text-[8px] font-mono bg-red-950/60 border border-red-900/50 px-1.5 py-0.5 rounded text-red-400 font-bold tracking-widest">
            LIVE
          </span>
        </div>
      )}
    </div>
  );
}

interface EditorialDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  content: EditableContent;
  onSave: (newContent: EditableContent) => boolean;
  onReset: () => void;
}

export default function EditorialDashboard({
  isOpen,
  onClose,
  content,
  onSave,
  onReset
}: EditorialDashboardProps) {
  const [activeTab, setActiveTab] = useState<"images" | "texts" | "videos">("images");
  const [formData, setFormData] = useState<EditableContent>({ ...content });
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const formRef = React.useRef<HTMLFormElement>(null);

  const scrollByAmount = (amount: number) => {
    if (formRef.current) {
      formRef.current.scrollBy({ top: amount, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (formRef.current) {
      formRef.current.scrollTo({ top: formRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  // Sync state if content changes externally (like on Reset)
  React.useEffect(() => {
    setFormData({ ...content });
  }, [content]);

  const handleChange = (field: keyof EditableContent, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    setIsSaved(false);
    setSaveError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSave(formData);
    if (success) {
      setIsSaved(true);
      setSaveError(null);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      setSaveError("LocalStorage quota exceeded! Some images are too large to save.");
      setTimeout(() => setSaveError(null), 6000);
    }
  };

  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to revert all changes to default editorial assets?")) {
      onReset();
      setIsSaved(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Right Side Editorial Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 h-screen w-full max-w-xl bg-zinc-950 border-l border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden text-white font-sans"
          >
            {/* Header / Brand Title */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] font-mono text-red-500 uppercase font-bold">
                    HARSHX STUDIO WORKSPACE
                  </span>
                </div>
                <h3 className="text-lg font-display font-black tracking-widest uppercase">
                  EDITORIAL MANAGER
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigators */}
            <div className="grid grid-cols-3 border-b border-white/5 bg-zinc-900/40 text-[9px] font-mono tracking-widest uppercase">
              <button
                onClick={() => setActiveTab("images")}
                className={`py-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
                  activeTab === "images"
                    ? "border-red-600 text-white bg-black/25"
                    : "border-transparent text-white/40 hover:text-white/80"
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>PHOTOS / ART</span>
              </button>
              <button
                onClick={() => setActiveTab("texts")}
                className={`py-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
                  activeTab === "texts"
                    ? "border-red-600 text-white bg-black/25"
                    : "border-transparent text-white/40 hover:text-white/80"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>TEXT / QUOTES</span>
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`py-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
                  activeTab === "videos"
                    ? "border-red-600 text-white bg-black/25"
                    : "border-transparent text-white/40 hover:text-white/80"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>VIDEOS & LINKS</span>
              </button>
            </div>

            {/* Scrollable Form Area with Custom Studio Scrollbar and smooth scrolling */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto studio-scrollbar scroll-smooth p-6 space-y-8"
            >
              {activeTab === "images" && (
                <div className="space-y-6 animate-fade-in">
                  <p className="text-[11px] text-white/40 leading-relaxed font-light">
                    Upload image files directly from your computer (drag & drop/click) or toggle the URL input option to paste direct HTTPS image links. Overrides are applied instantly!
                  </p>

                  <ImageFieldUploader
                    label="1. Hero Background (Atmospheric Cityscape)"
                    fieldKey="heroBg"
                    value={formData.heroBg}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="2. Spotlight Storefront Picture"
                    fieldKey="storefront"
                    value={formData.storefront}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="3. Panel 01 Art (Makima Cinematic Scene)"
                    fieldKey="makima"
                    value={formData.makima}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="4. Panel 02 Art (Aki Hayakawa Portrait)"
                    fieldKey="aki"
                    value={formData.aki}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="5. Panel 03 Art (Kobeni Cosplay Portrait)"
                    fieldKey="kobeni"
                    value={formData.kobeni}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="6. Section 02 Centerpiece (Denji & Makima Still)"
                    fieldKey="makimaDenji"
                    value={formData.makimaDenji}
                    onChange={handleChange}
                  />

                  <ImageFieldUploader
                    label="7. Character File Art (Angel Devil)"
                    fieldKey="angelDevil"
                    value={formData.angelDevil}
                    onChange={handleChange}
                  />
                </div>
              )}

              {activeTab === "texts" && (
                <div className="space-y-6">
                  {/* Hero Title */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Hero Showcase Header Title
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitle}
                      onChange={(e) => handleChange("heroTitle", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none font-bold"
                    />
                  </div>

                  {/* Hero Description */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Hero Description Paragraph
                    </label>
                    <textarea
                      value={formData.heroDesc}
                      onChange={(e) => handleChange("heroDesc", e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none leading-relaxed"
                    />
                  </div>

                  {/* Design Ideas Title */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Section 01 Header
                    </label>
                    <input
                      type="text"
                      value={formData.section1Title}
                      onChange={(e) => handleChange("section1Title", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none"
                    />
                  </div>

                  {/* Card 1 Title & Desc */}
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg space-y-4">
                    <span className="text-[9px] font-mono text-red-500 uppercase font-semibold">PANEL 01: MAKIMA STILL CARD</span>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Heading</label>
                      <input
                        type="text"
                        value={formData.makimaCardTitle}
                        onChange={(e) => handleChange("makimaCardTitle", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/80 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Caption</label>
                      <textarea
                        value={formData.makimaCardDesc}
                        onChange={(e) => handleChange("makimaCardDesc", e.target.value)}
                        rows={2}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/70 outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Card 2 Title & Desc */}
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg space-y-4">
                    <span className="text-[9px] font-mono text-red-500 uppercase font-semibold">PANEL 02: AKI MOOD CARD</span>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Heading</label>
                      <input
                        type="text"
                        value={formData.akiCardTitle}
                        onChange={(e) => handleChange("akiCardTitle", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/80 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Caption</label>
                      <textarea
                        value={formData.akiCardDesc}
                        onChange={(e) => handleChange("akiCardDesc", e.target.value)}
                        rows={2}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/70 outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Card 3 Title & Desc */}
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg space-y-4">
                    <span className="text-[9px] font-mono text-red-500 uppercase font-semibold">PANEL 03: KOBENI PORTRAIT CARD</span>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Heading</label>
                      <input
                        type="text"
                        value={formData.kobeniCardTitle}
                        onChange={(e) => handleChange("kobeniCardTitle", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/80 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Card Caption</label>
                      <textarea
                        value={formData.kobeniCardDesc}
                        onChange={(e) => handleChange("kobeniCardDesc", e.target.value)}
                        rows={2}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/70 outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Section 2 Title & Percent & Quote */}
                  <div className="p-4 border border-white/5 bg-zinc-900/30 rounded-lg space-y-4">
                    <span className="text-[9px] font-mono text-red-500 uppercase font-semibold">SECTION 02: CENTERPIECE HEADINGS</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-[8px] font-mono text-white/40 uppercase">Section Title</label>
                        <input
                          type="text"
                          value={formData.section2Title}
                          onChange={(e) => handleChange("section2Title", e.target.value)}
                          className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/80 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[8px] font-mono text-white/40 uppercase">Percent Stat Accent</label>
                        <input
                          type="text"
                          value={formData.section2Percent}
                          onChange={(e) => handleChange("section2Percent", e.target.value)}
                          className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/80 outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[8px] font-mono text-white/40 uppercase">Featured Review / Quote Text</label>
                      <textarea
                        value={formData.section2Quote}
                        onChange={(e) => handleChange("section2Quote", e.target.value)}
                        rows={3}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white/70 outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "videos" && (
                <div className="space-y-6">
                  {/* YouTube Trailer Url */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      YouTube Trailer Video URL / Link
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://youtu.be/EPaoHkV0dYw"
                      value={formData.trailerYoutubeUrl}
                      onChange={(e) => handleChange("trailerYoutubeUrl", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-mono text-white/80 outline-none"
                    />
                    <div className="text-[10px] text-white/40 flex items-start space-x-1 mt-1 leading-normal">
                      <Sparkles className="w-3 h-3 text-red-500 mt-0.5 shrink-0" />
                      <span>Accepts short links (youtu.be), watch links (youtube.com/watch?v=...), and embed links! We automatically parse the video ID.</span>
                    </div>
                  </div>

                  {/* Trailer Subtitle */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Trailer Subtitle (Japanese Accent)
                    </label>
                    <input
                      type="text"
                      value={formData.trailerSub}
                      onChange={(e) => handleChange("trailerSub", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none"
                    />
                  </div>

                  {/* Trailer Section Title */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Trailer Section Big Heading
                    </label>
                    <input
                      type="text"
                      value={formData.trailerTitle}
                      onChange={(e) => handleChange("trailerTitle", e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none font-black tracking-widest uppercase"
                    />
                  </div>

                  {/* Trailer Description */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Trailer Section Description Paragraph
                    </label>
                    <textarea
                      value={formData.trailerDesc}
                      onChange={(e) => handleChange("trailerDesc", e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 font-sans text-white/80 outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </form>

            {/* Quick Scroll Assistance Bar */}
            <div className="absolute right-6 bottom-24 z-30 flex flex-col space-y-1 bg-zinc-900/90 border border-white/15 backdrop-blur p-1 rounded-full shadow-2xl">
              <button
                type="button"
                onClick={scrollToTop}
                title="Scroll to Top"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center justify-center"
              >
                <ChevronUp className="w-4 h-4 text-red-500" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(-250)}
                title="Scroll Up"
                className="py-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all text-[8px] font-mono flex items-center justify-center font-bold tracking-wider"
              >
                UP
              </button>
              <div className="h-px bg-white/10 mx-1.5" />
              <button
                type="button"
                onClick={() => scrollByAmount(250)}
                title="Scroll Down"
                className="py-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all text-[8px] font-mono flex items-center justify-center font-bold tracking-wider"
              >
                DN
              </button>
              <button
                type="button"
                onClick={scrollToBottom}
                title="Scroll to Bottom"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Bottom Actions Sticky Bar */}
            <div className="p-6 border-t border-white/10 bg-black/90 flex items-center justify-between space-x-4">
              <button
                type="button"
                onClick={handleResetClick}
                className="px-4 py-2.5 border border-white/10 rounded text-xs font-mono tracking-wider text-white/50 hover:text-white hover:border-white/20 transition-colors duration-300 flex items-center space-x-2 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESET</span>
              </button>

              <div className="flex items-center space-x-3 w-full justify-end">
                <AnimatePresence>
                  {isSaved && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-[10px] font-mono text-green-400 uppercase tracking-widest flex items-center space-x-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>SAVED & APPLIED</span>
                    </motion.span>
                  )}
                  {saveError && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-[10px] font-mono text-red-500 uppercase tracking-wider flex items-center space-x-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      <span>{saveError}</span>
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="px-8 py-2.5 bg-[#CC0000] hover:bg-red-700 text-white rounded font-mono text-xs tracking-wider uppercase flex items-center space-x-2 shadow-[0_4px_20px_rgba(204,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(204,0,0,0.5)] transition-all duration-300 font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>PUBLISH STATE</span>
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
