'use client';

import { useState, useEffect } from "react";
import { Upload, Key, Play, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModelSelector } from "./ModelSelector";
import { DocumentPreview } from "./DocumentPreview";
import { useToast } from "@/hooks/use-toast";
import { processOCR } from "@/app/actions/ocr-actions";

export function OCRWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("openai/gpt-4o");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const { toast } = useToast();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        toast({
          variant: "destructive",
          title: "Invalid file",
          description: "Please upload an image or PDF file.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setOcrResult(null); // Reset result on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartOCR = async () => {
    if (!imagePreview) return;
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key missing",
        description: "Please enter your OpenRouter API key.",
      });
      return;
    }

    setIsProcessing(true);
    setOcrResult(null);
    setExecutionTime(null);
    const beginTime = Date.now();

    const result = await processOCR(imagePreview, selectedModel, apiKey);
    const endTime = Date.now();
    const elapsedTime = endTime - beginTime;
    
    setExecutionTime(elapsedTime);
    setIsProcessing(false);
    if (result.success) {
      setOcrResult(result.content || "No content returned.");
      toast({
        title: "OCR Complete",
        description: `Document processed in ${(elapsedTime / 1000).toFixed(2)}s.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to process OCR",
      });
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-8 min-h-[600px]">
        <div className="h-32 bg-white rounded-2xl border animate-pulse" />
        <div className="h-[600px] bg-white rounded-xl border animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end bg-white p-6 rounded-2xl border shadow-sm">
        <div className="md:col-span-3 space-y-2">
          <Label htmlFor="api-key" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" />
            OpenRouter API Key
          </Label>
          <Input 
            id="api-key"
            type="password"
            placeholder="sk-or-v1-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-white border-muted transition-workspace focus:border-brand-orange focus:ring-brand-orange/20"
          />
        </div>

        <div className="md:col-span-3">
          <ModelSelector value={selectedModel} onChange={setSelectedModel} />
        </div>

        <div className="md:col-span-4 space-y-2">
          <Label htmlFor="file-upload" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            Upload Document
          </Label>
          <div className="relative group">
            <Input 
              id="file-upload"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="cursor-pointer file:mr-4 file:py-0 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-brand-orange/90"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Button 
            onClick={handleStartOCR} 
            disabled={!imagePreview || isProcessing}
            className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold transition-workspace"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Run OCR
              </div>
            )}
          </Button>
        </div>
      </div>

      {!apiKey && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-dashed">
          <AlertCircle className="w-4 h-4" />
          <span>Note: You need an OpenRouter API key to process documents. Your key is only used for server-side requests and never stored.</span>
        </div>
      )}

      {/* Workspace Preview */}
      <DocumentPreview 
        imagePreview={imagePreview}
        ocrResult={ocrResult}
        isProcessing={isProcessing}
        executionTime={executionTime}
      />
    </div>
  );
}
