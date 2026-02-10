
import { OCRWorkspace } from "@/components/OCRWorkspace";
import { Toaster } from "@/components/ui/toaster";
import { FileText, Github, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-brand-orange/30">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-orange p-2 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                LLM <span className="text-brand-orange">OCR</span> Comparator
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground leading-none">
                High-Precision Vision AI
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors">Models</a>
            <div className="h-4 w-px bg-border mx-2" />
            <a href="https://github.com/bayuramadhans" target="_blank" className="text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              NEW: CLAUDE 3.5 SONNET V2 SUPPORT
            </div> */}
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Precise Document OCR with <br />
              <span className="text-brand-orange">LaTeX Preservation.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Convert complex documents, formulas, and diagrams into clean Markdown using the world's most powerful LLMs. Compare results across providers in real-time.
            </p>
          </div>

          <OCRWorkspace />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-orange border">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Multi-Format Support</h3>
              <p className="text-muted-foreground">Process PDFs, screenshots, and scanned documents. Automatic conversion to AI-optimized formats.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-orange border">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">LaTeX Intelligence</h3>
              <p className="text-muted-foreground">Sophisticated prompts ensure mathematical notation is preserved in clean LaTeX code within your markdown.</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-orange border">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Developer Ready</h3>
              <p className="text-muted-foreground">Export as standard .md files. Integrate processed data directly into your technical documentation workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-orange" />
            <a href="https://bayuramadhan.my.id" className="text-sm font-bold opacity-80">Bayu Ramadhan Shafiyuddin &copy; 2026</a>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <Toaster />
    </main>
  );
}
