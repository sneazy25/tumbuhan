"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PanduanPenanganan } from "@/components/PanduanPenanganan";

import { useState, useRef } from "react";
import { Leaf, ScanLine, UploadCloud, AlertCircle, CheckCircle2, Activity, ShieldAlert, Globe, ChevronDown, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { translations } from "@/lib/i18n/translations";
import { Prediction, Language } from "@/types";


export default function Home() {
  const [lang, setLang] = useState<Language>("id");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<Prediction[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const allFiles = [...selectedFiles, ...files];
      setSelectedFiles(allFiles);
      setPreviewUrls(allFiles.map(f => URL.createObjectURL(f)));
      setResults(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith("image/"));
    if (files.length > 0) {
      const allFiles = [...selectedFiles, ...files];
      setSelectedFiles(allFiles);
      setPreviewUrls(allFiles.map(f => URL.createObjectURL(f)));
      setResults(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || `Server error: ${response.status}`);
      }
      
      if (data?.status === "success" && data?.predictions) {
        setResults(data.predictions);
      } else {
        throw new Error(data?.error || t.errors.analysisFailed);
      }
    } catch (err: any) {
      setError(err.message || t.errors.serverError);
    } finally {
      setIsUploading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      {/* Navigation */}
      <Navbar lang={lang} setLang={setLang} />

      <main className="pt-32 pb-24 container mx-auto px-6 min-h-[80vh]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance text-foreground">
              {t.hero.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setError(null)} className="text-red-600 hover:text-red-700 hover:bg-red-500/10">{t.results.close}</Button>
            </div>
          )}

          {/* Upload & Preview Area - Hidden when results exist */}
          {!results && (
            <div className="w-full">
              {previewUrls.length === 0 ? (
                <div 
                  className="border border-dashed border-border/60 bg-muted/30 rounded-2xl p-16 text-center transition-all hover:border-primary/40 hover:bg-muted/50 cursor-pointer flex flex-col items-center justify-center min-h-[320px]"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="size-16 rounded-full bg-background shadow-sm flex items-center justify-center mb-6">
                    <UploadCloud className="size-8 text-primary/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{t.upload.dropTitle}</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px]">
                    {t.upload.dropSubtitle}
                  </p>
                </div>
              ) : (
                <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">{previewUrls.length} {t.upload.selectedFiles}</h3>
                    <Button variant="ghost" size="sm" onClick={resetAnalysis} className="text-muted-foreground hover:text-foreground">
                      {t.upload.cancel}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 border border-border/40 group">
                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    ))}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative aspect-square rounded-xl overflow-hidden border border-dashed border-border/60 bg-muted/20 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/40 hover:border-primary/40 transition-colors"
                    >
                      <span className="text-2xl text-muted-foreground font-light">+</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full rounded-xl text-base font-medium h-12 shadow-sm"
                    onClick={handleAnalyze}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Activity className="mr-2 size-5 animate-spin" />
                        {t.upload.analyzingText}
                      </>
                    ) : (
                      <>
                        <ScanLine className="mr-2 size-5" />
                        {t.upload.analyzeText}
                      </>
                    )}
                  </Button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple
                accept="image/jpeg,image/png,image/jpg" 
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* Results Area */}
          {results && !isUploading && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">{t.results.title}</h3>
                <Button variant="outline" size="sm" onClick={resetAnalysis} className="rounded-full px-4 text-xs font-medium bg-background shadow-sm hover:shadow-md transition-shadow">
                  {t.results.startNew}
                </Button>
              </div>

              <div className="space-y-4">
                {results.map((resArr, idx) => {
                  const topResult = resArr[0];
                  const isHealthy = topResult.is_healthy;
                  
                  return (
                    <div key={idx} className="bg-card border border-border/40 rounded-2xl p-4 md:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center w-full">
                        {/* Thumbnail */}
                        <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-muted/50 border border-border/40">
                        <img 
                          src={previewUrls[idx]} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col gap-1.5 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-24 shrink-0">{t.results.status}</span>
                            {isHealthy ? (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {t.results.healthy}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-500/10 px-2 py-0.5 rounded">
                                <span className="size-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                {t.results.unhealthy}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-24 shrink-0">{t.results.plantType}</span>
                            <span className="text-sm font-medium text-foreground capitalize">
                              {topResult.plant}
                            </span>
                          </div>

                          {!isHealthy && (
                            <div className="flex items-start gap-2">
                              <span className="text-xs text-muted-foreground w-24 shrink-0 pt-0.5">{t.results.diseaseType}</span>
                              <span className="text-sm font-bold text-foreground flex-1 leading-tight">
                                {topResult.disease}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Progress Bar & Akurasi */}
                        <div className="text-xs text-muted-foreground mb-1.5 font-medium">{t.results.prediction}</div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${isHealthy ? 'bg-emerald-500' : 'bg-primary'}`}
                              style={{ width: `${Math.max(topResult.confidence, 1)}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-foreground w-12 text-right">
                            {Math.round(topResult.confidence)}%
                          </span>
                        </div>
                      </div>

                      {/* Alternatif & Tombol Aksi (Responsif Mobile & Desktop) */}
                      {(resArr.length > 1 || !isHealthy) && (
                        <div className="flex flex-col gap-3 w-full md:w-52 shrink-0 pt-4 md:pt-0 md:pl-5 border-t md:border-t-0 md:border-l border-border/40 mt-1 md:mt-0 justify-center">
                          {resArr.length > 1 && (
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t.results.alternatives}</span>
                              {resArr.slice(1, 3).map((pred, i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground truncate pr-2" title={pred.disease}>{pred.disease}</span>
                                  <span className="text-xs font-medium text-foreground">{Math.round(pred.confidence)}%</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {!isHealthy && (
                            <a 
                              href={`https://www.google.com/search?q=${encodeURIComponent(topResult.disease + ' plant disease')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`hidden md:flex items-center justify-center w-full rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors py-2 px-3 text-xs font-semibold gap-2 border border-primary/20 ${resArr.length > 1 ? 'mt-1' : ''}`}
                            >
                              <Search className="size-3.5" />
                              <span>{t.results.learnMore}</span>
                            </a>
                          )}
                        </div>
                      )}
                      </div>
                      
                      {/* Saran AI Gemini (Minimalist full-width bottom) */}
                      {!isHealthy && (
                        <>
                          <PanduanPenanganan plant={topResult.plant} disease={topResult.disease} lang={lang} />
                          <a 
                            href={`https://www.google.com/search?q=${encodeURIComponent(topResult.disease + ' plant disease')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex md:hidden items-center justify-center w-full rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors py-2 px-3 text-xs font-semibold gap-2 border border-primary/20 mt-4"
                          >
                            <Search className="size-3.5" />
                            <span>{t.results.learnMore}</span>
                          </a>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
