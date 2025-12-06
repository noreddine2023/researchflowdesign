import React, { useState } from 'react';
import { NavView, Paper } from '../types';
import { Search, Filter, BookOpen, Trash2, FileText, CheckCircle, Clock } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui/Common';
import { MOCK_PAPERS } from '../constants';

export const Library: React.FC<{ onNavigate: (view: NavView, id?: string) => void }> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);

  const filteredPapers = papers.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Library</h1>
          <p className="text-slate-500 mt-1">Manage your saved papers and reading list.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onNavigate('search')}>
                <Search className="w-4 h-4 mr-2" /> Find More Papers
            </Button>
            <Button>
                <FileText className="w-4 h-4 mr-2" /> Upload PDF
            </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
               type="text" 
               placeholder="Search within library..." 
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
             <select className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                 <option>All Statuses</option>
                 <option>Unread</option>
                 <option>Reading</option>
                 <option>Read</option>
             </select>
             <select className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                 <option>Newest Added</option>
                 <option>Oldest Added</option>
                 <option>Title A-Z</option>
             </select>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {filteredPapers.map(paper => (
             <Card key={paper.id} className="p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow group">
                 {/* Visual Spine */}
                 <div className="w-full md:w-2 bg-blue-600"></div>
                 
                 <div className="p-6 flex-1 flex flex-col justify-between">
                     <div>
                         <div className="flex items-start justify-between mb-2">
                             <div className="flex gap-2 mb-2">
                                 {paper.tags.map(tag => (
                                     <Badge key={tag} variant="blue">{tag}</Badge>
                                 ))}
                             </div>
                             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="text-slate-400 hover:text-red-500" title="Remove from Library">
                                     <Trash2 className="w-4 h-4" />
                                 </button>
                             </div>
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-blue-600" onClick={() => onNavigate('paper', paper.id)}>
                             {paper.title}
                         </h3>
                         <div className="text-sm text-slate-500 mb-4">
                             {paper.authors.join(', ')} • {paper.venue} {paper.year}
                         </div>
                         <p className="text-slate-600 line-clamp-2 text-sm">
                             {paper.abstract}
                         </p>
                     </div>
                 </div>

                 <div className="p-6 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 md:w-64 flex flex-col gap-3 justify-center">
                     <div className="flex items-center gap-2 text-sm text-slate-600">
                         <Clock className="w-4 h-4 text-amber-500" />
                         <span>Added 2 days ago</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-slate-600">
                         <CheckCircle className="w-4 h-4 text-emerald-500" />
                         <span>Unread</span>
                     </div>
                     <div className="h-px bg-slate-200 my-1"></div>
                     <Button size="sm" onClick={() => onNavigate('paper', paper.id)}>
                         View Details
                     </Button>
                     <Button size="sm" variant="outline" onClick={() => onNavigate('pdf')}>
                         <BookOpen className="w-4 h-4 mr-2" /> Read PDF
                     </Button>
                 </div>
             </Card>
         ))}
         
         {filteredPapers.length === 0 && (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                 <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                     <Search className="w-6 h-6" />
                 </div>
                 <h3 className="text-lg font-medium text-slate-900">No papers found</h3>
                 <p className="text-slate-500">Try adjusting your search query.</p>
             </div>
         )}
      </div>
    </div>
  );
};