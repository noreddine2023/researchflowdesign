import React, { useState } from 'react';
import { NavView } from '../types';
import { 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  Highlighter, 
  MessageSquarePlus, 
  Download, 
  Share2, 
  Sidebar as SidebarIcon,
  Maximize2,
  X,
  MoreVertical
} from 'lucide-react';
import { Button, Badge } from '../components/ui/Common';

export const PDFReader: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [zoom, setZoom] = useState(100);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTool, setActiveTool] = useState<'cursor' | 'highlight' | 'comment'>('cursor');

  // Simulated content
  const annotations = [
    { id: 1, type: 'highlight', color: 'bg-yellow-200/50', top: '15%', left: '10%', width: '80%', height: '24px' },
    { id: 2, type: 'highlight', color: 'bg-green-200/50', top: '28%', left: '10%', width: '40%', height: '24px' },
    { id: 3, type: 'comment', top: '28%', left: '52%', content: 'This methodology is novel compared to existing literature.' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col">
      {/* Reader Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-20">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-slate-500" />
           </Button>
           <div className="hidden md:block">
              <h1 className="text-sm font-semibold text-slate-900 truncate max-w-md">Attention Is All You Need</h1>
              <p className="text-xs text-slate-500">Vaswani et al., 2017 • NeurIPS</p>
           </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
           <button 
             className={`p-1.5 rounded-md transition-colors ${activeTool === 'cursor' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
             onClick={() => setActiveTool('cursor')}
             title="Select"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
           </button>
           <button 
             className={`p-1.5 rounded-md transition-colors ${activeTool === 'highlight' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
             onClick={() => setActiveTool('highlight')}
             title="Highlight"
           >
             <Highlighter className="w-4 h-4" />
           </button>
           <button 
             className={`p-1.5 rounded-md transition-colors ${activeTool === 'comment' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
             onClick={() => setActiveTool('comment')}
             title="Add Comment"
           >
             <MessageSquarePlus className="w-4 h-4" />
           </button>
           <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
           <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md" onClick={() => setZoom(z => Math.max(50, z - 10))}>
              <ZoomOut className="w-4 h-4" />
           </button>
           <span className="text-xs font-medium w-12 text-center">{zoom}%</span>
           <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md" onClick={() => setZoom(z => Math.min(200, z + 10))}>
              <ZoomIn className="w-4 h-4" />
           </button>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="hidden md:flex">
             <span className="mr-2">✨</span> AI Summary
           </Button>
           <button 
             className={`p-2 rounded-md ${showSidebar ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
             onClick={() => setShowSidebar(!showSidebar)}
           >
             <SidebarIcon className="w-5 h-5" />
           </button>
           <Button variant="primary" size="sm">Export</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Main PDF View Area */}
        <div className="flex-1 bg-slate-100 overflow-auto flex justify-center p-8 custom-scrollbar">
           <div 
             className="bg-white shadow-lg transition-transform duration-200 origin-top relative"
             style={{ 
               width: `${8.5 * 96 * (zoom/100)}px`, 
               minHeight: `${11 * 96 * (zoom/100)}px`,
             }}
           >
              {/* Fake Content Layer */}
              <div className="absolute inset-0 p-[5%] select-none pointer-events-none opacity-80" style={{ fontSize: `${12 * (zoom/100)}px`}}>
                 <h1 className="text-3xl font-bold mb-4" style={{ fontSize: '2.5em' }}>Attention Is All You Need</h1>
                 <div className="flex gap-4 mb-8 text-slate-600" style={{ fontSize: '0.9em' }}>
                    <span>Ashish Vaswani</span><span>Noam Shazeer</span><span>Niki Parmar</span><span>Jakob Uszkoreit</span>
                 </div>
                 
                 <h2 className="font-bold mb-2 mt-8" style={{ fontSize: '1.5em' }}>Abstract</h2>
                 <p className="mb-4 leading-relaxed text-justify">
                   The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-100 h-40 w-full rounded flex items-center justify-center text-slate-400">Figure 1: Architecture</div>
                    <div>
                       <h2 className="font-bold mb-2" style={{ fontSize: '1.2em' }}>1 Introduction</h2>
                       <p className="text-justify leading-relaxed">
                          Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Annotation Overlay Layer */}
              {annotations.map(ann => (
                 ann.type === 'highlight' ? (
                   <div 
                     key={ann.id} 
                     className={`absolute ${ann.color} cursor-pointer hover:opacity-80 mix-blend-multiply rounded-sm`}
                     style={{ top: ann.top, left: ann.left, width: ann.width, height: ann.height }}
                   ></div>
                 ) : (
                   <div 
                     key={ann.id}
                     className="absolute w-6 h-6 -ml-3 -mt-3 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform z-10"
                     style={{ top: ann.top, left: ann.left }}
                   >
                      <MessageSquarePlus className="w-3 h-3" />
                   </div>
                 )
              ))}

           </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-xl z-20">
             <div className="flex border-b border-slate-200">
                <button className="flex-1 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Annotations</button>
                <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Outline</button>
                <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Citations</button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100 cursor-pointer hover:border-yellow-300 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span className="text-xs font-medium text-yellow-800">Highlight</span>
                      <span className="text-xs text-slate-400 ml-auto">Pg 1</span>
                   </div>
                   <p className="text-sm text-slate-700 font-serif italic line-clamp-3">"We propose a new simple network architecture, the Transformer, based solely on attention mechanisms..."</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer hover:border-blue-300 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-blue-800">Comment</span>
                      <span className="text-xs text-slate-400 ml-auto">Pg 1</span>
                   </div>
                   <p className="text-sm text-slate-700">This methodology is novel compared to existing literature.</p>
                   <div className="mt-2 text-xs text-slate-400">2 replies</div>
                </div>
             </div>
             
             <div className="p-4 border-t border-slate-200 bg-slate-50">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">AI Analysis</h4>
                <div className="space-y-2">
                   <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-white">Explain Methodology</Button>
                   <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-white">Find Related Papers</Button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
