
import React, { useState } from 'react';
import { MOCK_INSIGHTS } from '../constants';
import { Insight } from '../types';
import { 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  Tag, 
  Send, 
  X, 
  CheckSquare, 
  Square, 
  Trash2, 
  Calendar,
  User,
  Layout,
  AlignLeft,
  CheckCircle2
} from 'lucide-react';
import { Badge, Button, Input } from '../components/ui/Common';

const STATUS_COLS: { id: Insight['status'], label: string, color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: 'border-slate-300' },
  { id: 'in-progress', label: 'In Progress', color: 'border-blue-400' },
  { id: 'review', label: 'Review', color: 'border-purple-400' },
  { id: 'done', label: 'Done', color: 'border-emerald-400' }
];

export const Insights: React.FC = () => {
  const [insights, setInsights] = useState(MOCK_INSIGHTS);
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newTodo, setNewTodo] = useState('');

  const selectedInsight = insights.find(i => i.id === selectedInsightId);

  // Kanban Movement
  const moveInsight = (id: string, newStatus: Insight['status']) => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  // --- Modal Logic ---

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedInsightId) return;
    
    setInsights(prev => prev.map(i => {
      if (i.id === selectedInsightId) {
        return {
          ...i,
          comments: [
            ...(i.comments || []),
            {
              id: Math.random().toString(),
              user: 'John Doe',
              content: newComment,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return i;
    }));
    setNewComment('');
  };

  const handleAddTodo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTodo.trim() || !selectedInsightId) return;

    setInsights(prev => prev.map(i => {
      if (i.id === selectedInsightId) {
        return {
          ...i,
          todos: [
            ...(i.todos || []),
            {
              id: Math.random().toString(),
              text: newTodo,
              completed: false
            }
          ]
        };
      }
      return i;
    }));
    setNewTodo('');
  };

  const toggleTodo = (insightId: string, todoId: string) => {
    setInsights(prev => prev.map(i => {
      if (i.id === insightId) {
        return {
          ...i,
          todos: i.todos?.map(t => t.id === todoId ? { ...t, completed: !t.completed } : t)
        };
      }
      return i;
    }));
  };

  const deleteTodo = (insightId: string, todoId: string) => {
    setInsights(prev => prev.map(i => {
      if (i.id === insightId) {
        return {
          ...i,
          todos: i.todos?.filter(t => t.id !== todoId)
        };
      }
      return i;
    }));
  };

  // Calculate progress for a specific insight
  const getProgress = (i: Insight) => {
    if (!i.todos || i.todos.length === 0) return 0;
    const completed = i.todos.filter(t => t.completed).length;
    return Math.round((completed / i.todos.length) * 100);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Research Insights</h1>
           <p className="text-slate-500 mt-1">Track findings, methodologies, and ideas across your library.</p>
        </div>
        <Button>
           <Plus className="w-4 h-4 mr-2" /> New Insight
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-[1000px] pb-4">
           {STATUS_COLS.map(col => (
             <div key={col.id} className="flex-1 flex flex-col bg-slate-100/50 rounded-xl p-4 border border-slate-200">
                <div className={`flex items-center justify-between mb-4 pl-2 border-l-4 ${col.color}`}>
                   <h3 className="font-semibold text-slate-700">{col.label}</h3>
                   <span className="bg-white px-2 py-0.5 rounded text-xs text-slate-500 border border-slate-200 font-mono">
                      {insights.filter(i => i.status === col.id).length}
                   </span>
                </div>

                <div className="flex-1 space-y-3">
                   {insights.filter(i => i.status === col.id).map(insight => {
                      const progress = getProgress(insight);
                      const hasTodos = insight.todos && insight.todos.length > 0;

                      return (
                        <div 
                          key={insight.id} 
                          onClick={() => setSelectedInsightId(insight.id)}
                          className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative hover:-translate-y-1"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={
                              insight.type === 'finding' ? 'blue' : 
                              insight.type === 'limitation' ? 'amber' : 
                              insight.type === 'methodology' ? 'purple' : 'gray'
                            } className="capitalize">
                              {insight.type}
                            </Badge>
                            <button className="text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">{insight.title}</h4>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3">{insight.content}</p>
                          
                          {/* Progress Bar (if items exist) */}
                          {hasTodos && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                              <div className="flex items-center gap-3 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" /> {insight.comments?.length || 0}
                                </div>
                                {hasTodos && (
                                  <div className="flex items-center gap-1">
                                    <CheckSquare className="w-3 h-3" /> {insight.todos?.filter(t => t.completed).length}/{insight.todos?.length}
                                  </div>
                                )}
                              </div>
                              
                              {insight.paperId && (
                                <div className="flex -space-x-1">
                                  <div className="w-5 h-5 rounded-full bg-blue-100 border border-white text-[10px] flex items-center justify-center text-blue-700">P</div>
                                </div>
                              )}
                          </div>
                        </div>
                   )})}
                   
                   <button className="w-full py-2 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors border border-transparent hover:border-slate-200 border-dashed">
                      <Plus className="w-4 h-4 mr-1" /> Add Card
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedInsightId(null)}
          ></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50">
               <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-3">
                     <Badge variant={
                        selectedInsight.type === 'finding' ? 'blue' : 
                        selectedInsight.type === 'limitation' ? 'amber' : 
                        selectedInsight.type === 'methodology' ? 'purple' : 'gray'
                      } className="capitalize flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {selectedInsight.type}
                     </Badge>
                     <div className="h-4 w-[1px] bg-slate-300"></div>
                     <select 
                       className="bg-transparent text-sm font-medium text-slate-600 border-none p-0 focus:ring-0 cursor-pointer"
                       value={selectedInsight.status}
                       onChange={(e) => moveInsight(selectedInsight.id, e.target.value as Insight['status'])}
                     >
                       <option value="backlog">Backlog</option>
                       <option value="in-progress">In Progress</option>
                       <option value="review">Review</option>
                       <option value="done">Done</option>
                     </select>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">{selectedInsight.title}</h2>
               </div>
               <button 
                 onClick={() => setSelectedInsightId(null)}
                 className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              
              {/* Left Column: Content & Checklists */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar border-r border-slate-100">
                 
                 {/* Description */}
                 <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <AlignLeft className="w-4 h-4" /> Description
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed min-h-[100px]">
                       {selectedInsight.content}
                    </div>
                 </div>

                 {/* Todo List / Checklist */}
                 <div>
                    <div className="flex items-center justify-between mb-3">
                       <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <CheckSquare className="w-4 h-4" /> Action Items
                       </h3>
                       {selectedInsight.todos && selectedInsight.todos.length > 0 && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                             {Math.round((selectedInsight.todos.filter(t => t.completed).length / selectedInsight.todos.length) * 100)}% Done
                          </span>
                       )}
                    </div>
                    
                    <div className="space-y-3">
                       <div className="mb-4">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${selectedInsight.todos && selectedInsight.todos.length > 0 ? (selectedInsight.todos.filter(t => t.completed).length / selectedInsight.todos.length) * 100 : 0}%` }}
                             ></div>
                          </div>
                       </div>

                       {selectedInsight.todos?.map(todo => (
                          <div key={todo.id} className="group flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                             <button 
                                onClick={() => toggleTodo(selectedInsight.id, todo.id)}
                                className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors
                                  ${todo.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 text-transparent hover:border-blue-400'}
                                `}
                             >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                             </button>
                             <span className={`flex-1 text-sm ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {todo.text}
                             </span>
                             <button 
                                onClick={() => deleteTodo(selectedInsight.id, todo.id)}
                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                       ))}

                       {/* Add Todo Input */}
                       <form onSubmit={handleAddTodo} className="flex items-center gap-3 mt-4 pl-2">
                          <Plus className="w-4 h-4 text-slate-400" />
                          <input 
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 p-0"
                            placeholder="Add an item to checklist..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                          />
                          <Button 
                            type="submit" 
                            size="sm" 
                            variant="secondary"
                            disabled={!newTodo.trim()}
                          >
                             Add
                          </Button>
                       </form>
                    </div>
                 </div>
              </div>

              {/* Right Column: Activity & Comments */}
              <div className="w-full md:w-80 bg-slate-50/50 flex flex-col">
                 <div className="p-4 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Metadata</h3>
                    <div className="space-y-3">
                       {selectedInsight.paperId && (
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                <Layout className="w-4 h-4" />
                             </div>
                             <div className="flex-1 overflow-hidden">
                                <p className="text-xs text-slate-400">Linked Paper</p>
                                <p className="font-medium truncate hover:text-blue-600 cursor-pointer">Attention Is All You Need</p>
                             </div>
                          </div>
                       )}
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                             <User className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-xs text-slate-400">Assignee</p>
                             <p className="font-medium">John Doe</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                             <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-xs text-slate-400">Created</p>
                             <p className="font-medium">Oct 24, 2023</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex-1 flex flex-col min-h-0">
                    <div className="p-4 border-b border-slate-100 bg-white">
                       <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Activity</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                       {selectedInsight.comments?.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                             <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-200">
                                {comment.user.charAt(0)}
                             </div>
                             <div className="flex-1">
                                <div className="flex items-baseline justify-between">
                                   <span className="text-sm font-semibold text-slate-900">{comment.user}</span>
                                   <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                                </div>
                                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm mt-1">
                                   <p className="text-sm text-slate-700">{comment.content}</p>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200">
                       <div className="relative">
                          <input 
                             type="text" 
                             className="w-full pr-10 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                             placeholder="Write a comment..."
                             value={newComment}
                             onChange={(e) => setNewComment(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                          />
                          <button 
                             onClick={handleAddComment}
                             className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${newComment.trim() ? 'text-blue-600 hover:bg-blue-50' : 'text-slate-300'}`}
                             disabled={!newComment.trim()}
                          >
                             <Send className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
