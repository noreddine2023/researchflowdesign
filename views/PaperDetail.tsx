import React from 'react';
import { NavView } from '../types';
import { ArrowLeft, ExternalLink, FileText, Share2, Quote, BookOpen, Sparkles, Download, Layers } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui/Common';
import { MOCK_PAPERS } from '../constants';

export const PaperDetail: React.FC<{ id: string; onNavigate: (view: NavView, id?: string) => void }> = ({ id, onNavigate }) => {
  const paper = MOCK_PAPERS.find(p => p.id === id) || MOCK_PAPERS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
       <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600" onClick={() => onNavigate('library')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
       </Button>

       {/* Header Section */}
       <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
             {paper.tags.map(tag => (
                <Badge key={tag} variant="blue">{tag}</Badge>
             ))}
             <Badge variant="gray">{paper.venue} {paper.year}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
             {paper.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-600">
             <div className="font-medium">{paper.authors.join(', ')}</div>
             <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
             <div>DOI: 10.1038/s41586-023-00000-0</div>
             <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
             <div className="flex items-center gap-1">
                <Quote className="w-3 h-3" /> {paper.citations} Citations
             </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
             <Button size="lg" onClick={() => onNavigate('pdf')}>
                <BookOpen className="w-5 h-5 mr-2" /> Read Full Text
             </Button>
             <Button variant="outline" size="lg">
                <FileText className="w-5 h-5 mr-2" /> Upload PDF
             </Button>
             <Button variant="outline" size="lg">
                <ExternalLink className="w-5 h-5 mr-2" /> Open Source
             </Button>
             <Button variant="ghost" size="lg">
                <Share2 className="w-5 h-5 mr-2" /> Share
             </Button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             <Card className="p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Abstract</h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                   {paper.abstract}
                   <br/><br/>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
             </Card>

             <Card className="p-8 border-purple-100 bg-purple-50/30">
                <div className="flex items-center gap-2 mb-4">
                   <Sparkles className="w-5 h-5 text-purple-600" />
                   <h2 className="text-xl font-bold text-slate-900">AI Analysis</h2>
                </div>
                
                <div className="space-y-6">
                   <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Key Findings</h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700">
                         <li>Demonstrates a 15% improvement in efficiency over baseline models.</li>
                         <li>Introduces a novel "Sparse Attention" mechanism reducing quadratic complexity.</li>
                         <li>Validates results across 3 standard benchmarks (ImageNet, CIFAR-100, COCO).</li>
                      </ul>
                   </div>
                   
                   <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Methodology</h3>
                      <p className="text-slate-700">
                         The authors utilize a Transformer-based architecture modified with sparse attention masks. Training was conducted on 8x TPU v3 pods for 14 days.
                      </p>
                   </div>
                   
                   <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300">
                      Generate Deep Dive Report
                   </Button>
                </div>
             </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
             <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Collections</h3>
                <div className="space-y-2">
                   <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center gap-2">
                         <Layers className="w-4 h-4 text-blue-500" />
                         <span className="text-sm font-medium text-slate-700">Deep Learning</span>
                      </div>
                      <button className="text-xs text-red-500 opacity-0 group-hover:opacity-100">Remove</button>
                   </div>
                   <Button variant="outline" size="sm" className="w-full mt-2 border-dashed">
                      + Add to Collection
                   </Button>
                </div>
             </Card>

             <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">References</h3>
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                      <div key={i} className="text-sm">
                         <div className="font-medium text-slate-900 hover:text-blue-600 cursor-pointer">
                            Attention Mechanisms in Neural Networks
                         </div>
                         <div className="text-slate-500 text-xs">Bahdanau et al., 2015</div>
                      </div>
                   ))}
                   <Button variant="ghost" size="sm" className="w-full text-slate-500">View All 42 References</Button>
                </div>
             </Card>
             
             <Card className="p-6 bg-slate-900 text-white">
                <h3 className="font-semibold mb-2">Export Citation</h3>
                <p className="text-sm text-slate-400 mb-4">Format: APA 7th Edition</p>
                <div className="bg-slate-800 p-3 rounded text-xs font-mono mb-4 overflow-x-auto">
                   Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. Advances in neural information processing systems, 30.
                </div>
                <div className="flex gap-2">
                   <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 w-full">Copy</Button>
                   <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:text-white w-full">BibTeX</Button>
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
};