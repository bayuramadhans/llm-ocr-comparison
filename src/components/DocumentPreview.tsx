
'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Download, Copy, CheckCircle2, File, Layout, Eye, Code } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentPreviewProps {
  imagePreview: string | null;
  ocrResult: string | null;
  isProcessing: boolean;
  executionTime?: number | null;
}

export function DocumentPreview({ imagePreview, ocrResult, isProcessing, executionTime }: DocumentPreviewProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const isPdf = imagePreview?.startsWith('data:application/pdf');

  const handleDownload = () => {
    if (!ocrResult) return;
    const blob = new Blob([ocrResult], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ocr-result-${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!ocrResult) return;
    navigator.clipboard.writeText(ocrResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Markdown copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border rounded-xl overflow-hidden bg-white shadow-lg min-h-[600px]">
      {/* Source Document Column */}
      <div className="flex flex-col border-r bg-muted/5">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            {isPdf ? <File className="w-4 h-4 text-brand-orange" /> : <FileText className="w-4 h-4 text-brand-orange" />}
            <span className="text-sm font-semibold uppercase tracking-wider">
              {isPdf ? 'Source PDF' : 'Source Document'}
            </span>
          </div>
        </div>
        
        <div className="flex-1 bg-muted/10 relative overflow-hidden">
          {imagePreview ? (
            <div className="w-full h-full flex flex-col">
              {isPdf ? (
                <iframe
                  src={`${imagePreview}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full min-h-[600px] border-0"
                  title="PDF Preview"
                />
              ) : (
                <ScrollArea className="flex-1 p-8">
                  <div className="flex justify-center items-start">
                    <img 
                      src={imagePreview} 
                      alt="Source preview" 
                      className="max-w-full h-auto rounded-lg shadow-md border bg-white"
                    />
                  </div>
                </ScrollArea>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground opacity-40">
              <FileText className="w-16 h-16 mb-4" />
              <p>Upload a document to start</p>
            </div>
          )}
        </div>
      </div>

      {/* OCR Result Column */}
      <div className="flex flex-col bg-white">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-orange-500 animate-pulse' : ocrResult ? 'bg-green-500' : 'bg-muted'}`} />
            <span className="text-sm font-semibold uppercase tracking-wider">OCR Output</span>
            {executionTime !== null && (
              <span className="text-xs text-muted-foreground ml-2 font-normal">
                ({(executionTime / 1000).toFixed(2)}s)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {ocrResult && (
              <>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-1">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload} className="h-8 gap-1">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download .md</span>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {isProcessing ? (
            <div className="p-8 space-y-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-20 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          ) : ocrResult ? (
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <div className="px-4 py-2 border-b bg-muted/5">
                <TabsList className="grid w-full max-w-[200px] grid-cols-2 h-8">
                  <TabsTrigger value="preview" className="text-xs gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="text-xs gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    Raw
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="flex-1 m-0 focus-visible:ring-0">
                <ScrollArea className="h-full max-h-[700px]">
                  <div className="p-8 prose prose-slate prose-orange max-w-none selection:bg-brand-orange/20">
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {ocrResult}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="raw" className="flex-1 m-0 focus-visible:ring-0">
                <ScrollArea className="h-full max-h-[700px]">
                  <div className="p-8 font-code text-sm leading-relaxed whitespace-pre-wrap selection:bg-brand-orange/20">
                    {ocrResult}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground opacity-40">
              <p className="italic">Result will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
