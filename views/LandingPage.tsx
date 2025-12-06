import React from 'react';
import { NavView } from '../types';
import { ArrowRight, Brain, Zap, Search, Layers, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Common';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ResearchFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">Features</Button>
            <Button variant="ghost" className="hidden md:inline-flex">Pricing</Button>
            <Button onClick={onEnterApp}>Dashboard Demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: AI Agent for Semantic Analysis
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
            Accelerate your research with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Artificial Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect to 200M+ papers. Synthesize findings instantly. ResearchFlow transforms weeks of literature review into hours of high-level insight.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full" onClick={onEnterApp}>
              Start Researching Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
              View Documentation
            </Button>
          </div>

          {/* Mock UI Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-20 h-full w-full"></div>
            <div className="relative rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-2xl p-2 mx-auto max-w-4xl rotate-x-12 perspective-1000 transform-gpu hover:scale-[1.01] transition-transform duration-700">
               <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 aspect-[16/9] flex flex-col">
                  <div className="h-10 border-b border-slate-200 bg-white flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-12 p-6 gap-6">
                    <div className="col-span-3 space-y-3">
                       <div className="h-8 w-full bg-slate-200 rounded animate-pulse"></div>
                       <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                       <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-9 space-y-4">
                       <div className="h-32 w-full bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                          <div className="h-4 w-1/3 bg-blue-200 rounded mb-2"></div>
                          <div className="h-2 w-full bg-blue-100 rounded"></div>
                          <div className="h-2 w-full bg-blue-100 rounded mt-2"></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-white border border-slate-200 rounded-xl"></div>
                          <div className="h-24 bg-white border border-slate-200 rounded-xl"></div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: 'Semantic Search', desc: 'Stop relying on keywords. Find papers based on meaning, methodology, and results using vector embeddings.' },
              { icon: Zap, title: 'Instant Analysis', desc: 'Extract key findings, limitations, and future work from any PDF in seconds with our custom LLM pipeline.' },
              { icon: Layers, title: 'Knowledge Graph', desc: 'Visualize connections between papers. Identify citation clusters and seminal works automatically.' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-50 hover:bg-blue-50/30 transition-colors border border-slate-100 hover:border-blue-100">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
