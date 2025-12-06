import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Download, Plus, Star, BookOpen, Quote } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui/Common';
import { NavView } from '../types';

export const Search: React.FC<{ onNavigate: (view: NavView, id?: string) => void }> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock results that filter based on simple text (simulated)
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const MockResults = [
    { id: '101', title: 'Large Language Models for Scientific Synthesis', authors: ['Smith et al.'], year: 2023, venue: 'Nature', citations: 45, abstract: 'We explore the capability of LLMs to generate novel scientific hypotheses by synthesizing vast amounts of literature.' },
    { id: '102', title: 'Generative Agents: Interactive Simulacra of Human Behavior', authors: ['Park et al.'], year: 2023, venue: 'arXiv', citations: 120, abstract: 'This paper introduces generative agents—computational software agents that simulate believable human behavior.' },
    { id: '103', title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', authors: ['Wei et al.'], year: 2022, venue: 'NeurIPS', citations: 2100, abstract: 'We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of large language models to perform complex reasoning.' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Search Semantic Scholar & OpenAlex</h1>
        <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Access 200M+ papers. Use natural language to find specific methodologies, results, or theoretical frameworks.</p>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 shadow-sm text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            placeholder="e.g. 'Transformer architecture efficiency improvements'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
             <Button size="sm" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
             </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            <span className="text-xs text-blue-600 cursor-pointer font-medium hover:underline">Reset</span>
          </div>
          
          <div className="space-y-4">
             <div>
               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Year Range</label>
               <div className="flex items-center gap-2">
                 <Input placeholder="2020" className="h-8 text-xs" />
                 <span className="text-slate-400">-</span>
                 <Input placeholder="2024" className="h-8 text-xs" />
               </div>
             </div>

             <div>
               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Source</label>
               <div className="space-y-2">
                 {['Journals', 'Conferences', 'Preprints'].map(s => (
                   <label key={s} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                     <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                     {s}
                   </label>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-12 md:col-span-9 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-sm text-slate-500">Showing {MockResults.length} results</span>
            <select className="text-sm border-none bg-transparent text-slate-600 font-medium cursor-pointer focus:ring-0">
              <option>Most Relevant</option>
              <option>Newest First</option>
              <option>Most Cited</option>
            </select>
          </div>

          {loading ? (
             // Skeleton Loading
             [1,2,3].map(i => (
                <Card key={i} className="p-6 animate-pulse">
                   <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                   <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                   <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full"></div>
                      <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                   </div>
                </Card>
             ))
          ) : (
            MockResults.map(paper => (
              <Card key={paper.id} className="p-6 hover:border-blue-300 transition-all group">
                <div className="flex justify-between items-start">
                   <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 cursor-pointer" onClick={() => onNavigate('paper', paper.id)}>
                        {paper.title}
                      </h3>
                      <div className="text-sm text-slate-500 mb-3 flex items-center flex-wrap gap-2">
                        <span className="font-medium text-slate-700">{paper.authors[0]}</span>
                        <span>•</span>
                        <span>{paper.venue}</span>
                        <span>•</span>
                        <span>{paper.year}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                          <Quote className="w-3 h-3" /> {paper.citations}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm mb-4">
                        {paper.abstract}
                      </p>
                   </div>
                   <button className="text-slate-400 hover:text-amber-500 transition-colors p-1">
                      <Star className="w-5 h-5" />
                   </button>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                   <Button size="sm" variant="outline" onClick={() => onNavigate('paper', paper.id)}>
                      <BookOpen className="w-4 h-4 mr-2" /> View Details
                   </Button>
                   <Button size="sm" variant="secondary">
                      <Plus className="w-4 h-4 mr-2" /> Add to Collection
                   </Button>
                   <div className="flex-1"></div>
                   <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600">
                      <Download className="w-4 h-4" />
                   </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};