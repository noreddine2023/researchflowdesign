
import React, { useState } from 'react';
import { Bold, Italic, List, AlignLeft, Image, Link as LinkIcon, MoreVertical, Plus, GripVertical, ChevronRight, Wand2 } from 'lucide-react';
import { Card, Button } from '../components/ui/Common';
import { EditorBlock, Document } from '../types';

const INITIAL_DOCS: Document[] = [
  { 
     id: '1', 
     title: 'Literature Review: Transformers', 
     updatedAt: '2m ago',
     blocks: [
       { id: 'b1', type: 'h1', content: 'Literature Review: Attention Mechanisms' },
       { id: 'b2', type: 'p', content: 'The advent of the Transformer architecture [Vaswani et al., 2017] marked a paradigm shift in natural language processing.' },
       { id: 'b3', type: 'quote', content: 'Attention is all you need.' },
       { id: 'b4', type: 'p', content: 'Subsequent research has focused on optimizing the computational efficiency of these mechanisms.' }
     ]
  },
  { id: '2', title: 'Thesis Chapter 1', updatedAt: '1d ago', blocks: [] },
  { id: '3', title: 'Conference Abstract', updatedAt: '3d ago', blocks: [] },
];

export const WritingAssistant: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<string>('1');
  const [docs, setDocs] = useState<Document[]>(INITIAL_DOCS);
  
  const activeDoc = docs.find(d => d.id === activeDocId) || docs[0];

  const updateBlock = (blockId: string, content: string) => {
    const newDocs = docs.map(d => {
      if (d.id === activeDocId) {
        return {
          ...d,
          blocks: d.blocks.map(b => b.id === blockId ? { ...b, content } : b)
        };
      }
      return d;
    });
    setDocs(newDocs);
  };

  const addBlock = (afterId: string, type: EditorBlock['type'] = 'p') => {
    const newDocs = docs.map(d => {
      if (d.id === activeDocId) {
        const index = d.blocks.findIndex(b => b.id === afterId);
        const newBlock: EditorBlock = { id: Math.random().toString(36).substr(2, 9), type, content: '' };
        const newBlocks = [...d.blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        return { ...d, blocks: newBlocks };
      }
      return d;
    });
    setDocs(newDocs);
  };
  
  // Simple move function to simulate drag
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const newDocs = docs.map(d => {
       if (d.id === activeDocId) {
          const index = d.blocks.findIndex(b => b.id === blockId);
          if (direction === 'up' && index === 0) return d;
          if (direction === 'down' && index === d.blocks.length - 1) return d;
          
          const newBlocks = [...d.blocks];
          const swapIndex = direction === 'up' ? index - 1 : index + 1;
          [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
          return { ...d, blocks: newBlocks };
       }
       return d;
    });
    setDocs(newDocs);
  };

  return (
    <div className="h-full flex gap-6 animate-in fade-in duration-500">
      
      {/* Document Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4">
        <Button className="w-full justify-start" variant="primary">
          <Plus className="w-4 h-4 mr-2" /> New Document
        </Button>
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-3 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Your Documents
           </div>
           <div className="overflow-y-auto p-2 space-y-1">
             {docs.map((doc) => (
               <div 
                 key={doc.id} 
                 onClick={() => setActiveDocId(doc.id)}
                 className={`p-3 rounded-lg text-sm cursor-pointer transition-all flex justify-between group
                    ${activeDocId === doc.id 
                       ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' 
                       : 'text-slate-600 hover:bg-slate-50'
                    }`}
               >
                  <span className="truncate">{doc.title}</span>
                  {activeDocId === doc.id && <ChevronRight className="w-4 h-4" />}
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
         {/* Editor Toolbar */}
         <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Bold className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Italic className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><LinkIcon className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600" title="Heading 1"><span className="font-bold text-xs">H1</span></button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600" title="Heading 2"><span className="font-bold text-xs">H2</span></button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><List className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 text-center text-xs text-slate-400">
               {activeDoc.title} • Last saved {activeDoc.updatedAt}
            </div>
            <div className="flex items-center gap-2">
               <Button size="sm" variant="ghost">Share</Button>
               <Button size="sm" variant="outline">Export PDF</Button>
            </div>
         </div>

         {/* Block Editor Canvas */}
         <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50/30">
            <div className="max-w-3xl mx-auto min-h-[500px] pb-32">
               {activeDoc.blocks.map((block) => (
                  <div key={block.id} className="group relative flex items-start -ml-12 pl-12 mb-2">
                     {/* Hover Controls */}
                     <div className="absolute left-0 top-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing hover:bg-slate-200 rounded"
                            title="Drag to move (simulated)"
                         >
                            <GripVertical className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => addBlock(block.id)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                         >
                            <Plus className="w-4 h-4" />
                         </button>
                         <div className="flex flex-col">
                            <button onClick={() => moveBlock(block.id, 'up')} className="text-[8px] hover:text-blue-600 leading-none">▲</button>
                            <button onClick={() => moveBlock(block.id, 'down')} className="text-[8px] hover:text-blue-600 leading-none">▼</button>
                         </div>
                     </div>

                     {/* Block Content */}
                     <div 
                        className={`w-full outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300
                           ${block.type === 'h1' ? 'text-4xl font-bold text-slate-900 mb-4' : ''}
                           ${block.type === 'h2' ? 'text-2xl font-bold text-slate-800 mt-6 mb-3' : ''}
                           ${block.type === 'p' ? 'text-lg text-slate-700 leading-relaxed mb-2' : ''}
                           ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-4 py-2 italic text-slate-600 bg-slate-50 rounded-r' : ''}
                        `}
                        contentEditable
                        suppressContentEditableWarning
                        data-placeholder={`Type '/' for commands`}
                        onBlur={(e) => updateBlock(block.id, e.currentTarget.textContent || '')}
                     >
                        {block.content}
                     </div>
                  </div>
               ))}
               
               {/* Empty State click to add */}
               {activeDoc.blocks.length === 0 && (
                  <div 
                    className="text-slate-300 italic cursor-text" 
                    onClick={() => addBlock('start', 'h1')}
                  >
                     Start writing your amazing paper...
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* AI Assistant Panel */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-4">
         <Card className="flex-1 p-0 overflow-hidden flex flex-col bg-white/80 backdrop-blur">
            <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
               <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                  <Wand2 className="w-4 h-4" /> AI Copilot
               </div>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
               <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-sm">
                  <p className="text-slate-700 mb-2">I can help you expand on the "Transformer Architecture" section. Would you like some key points?</p>
                  <Button size="sm" className="w-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50">Generate Outline</Button>
               </div>
            </div>
            <div className="p-3 border-t border-slate-100">
               <div className="relative">
                  <input type="text" placeholder="Ask AI..." className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none" />
                  <div className="absolute right-2 top-2 text-slate-400"><Wand2 className="w-4 h-4" /></div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};