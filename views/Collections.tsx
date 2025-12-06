
import React, { useState } from 'react';
import { NavView, Collection } from '../types';
import { Folder, FolderPlus, MoreVertical, ChevronRight, ChevronDown, Plus, FileText, Trash2, Edit2 } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui/Common';
import { MOCK_COLLECTIONS, MOCK_PAPERS } from '../constants';

interface CollectionItemProps {
  collection: Collection;
  level?: number;
  activeId: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

// Recursive Collection Tree Item
const CollectionItem: React.FC<CollectionItemProps> = ({ 
  collection, 
  level = 0, 
  activeId, 
  onSelect, 
  onToggle 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    onToggle(collection.id);
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors group
          ${activeId === collection.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}
        `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => onSelect(collection.id)}
      >
        <button onClick={handleToggle} className={`p-0.5 rounded hover:bg-black/5 ${!collection.subCollections ? 'invisible' : ''}`}>
           {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
        <Folder className={`w-4 h-4 ${activeId === collection.id ? 'fill-blue-200 text-blue-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
        <span className="flex-1 text-sm font-medium truncate">{collection.name}</span>
        <span className="text-xs text-slate-400 group-hover:text-slate-500">{collection.count}</span>
        
        <div className="relative group/menu">
           <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded text-slate-400">
              <MoreVertical className="w-3 h-3" />
           </button>
        </div>
      </div>
      
      {isOpen && collection.subCollections && (
        <div>
          {collection.subCollections.map(sub => (
            <CollectionItem 
              key={sub.id} 
              collection={sub} 
              level={level + 1} 
              activeId={activeId} 
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Collections: React.FC<{ onNavigate: (view: NavView, id?: string) => void }> = ({ onNavigate }) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>('1');
  const [collections, setCollections] = useState<Collection[]>(MOCK_COLLECTIONS);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const activeCollection = collections.find(c => c.id === activeCollectionId) || collections[0];

  const handleCreateCollection = () => {
    if (!newCollectionName) return;
    const newCol: Collection = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCollectionName,
      count: 0,
      color: 'bg-slate-500'
    };
    setCollections([...collections, newCol]);
    setNewCollectionName('');
    setShowNewModal(false);
  };

  return (
    <div className="h-full flex gap-6 animate-in fade-in duration-500">
      
      {/* Sidebar Tree */}
      <div className="w-72 flex-shrink-0 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Collections</h2>
            <button 
               onClick={() => setShowNewModal(true)}
               className="p-1.5 hover:bg-white hover:shadow-sm rounded text-slate-500 hover:text-blue-600 transition-all"
            >
               <FolderPlus className="w-4 h-4" />
            </button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-2">
            {collections.map(col => (
               <CollectionItem 
                  key={col.id} 
                  collection={col} 
                  activeId={activeCollectionId} 
                  onSelect={setActiveCollectionId}
                  onToggle={() => {}} 
               />
            ))}
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
         <div className="flex items-end justify-between mb-6">
            <div>
               <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                  <Folder className="w-4 h-4" /> Collections / {activeCollection?.name}
               </div>
               <h1 className="text-3xl font-bold text-slate-900">{activeCollection?.name}</h1>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" /> Rename
               </Button>
               <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {MOCK_PAPERS.map(paper => (
               <Card key={paper.id} className="p-5 flex gap-4 hover:border-blue-300 transition-all cursor-pointer group" onClick={() => onNavigate('paper', paper.id)}>
                  <div className="w-12 h-16 bg-slate-100 border border-slate-200 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                     <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 mb-1">{paper.title}</h3>
                     <p className="text-sm text-slate-500 mb-2 truncate">{paper.authors.join(', ')}</p>
                     <div className="flex items-center gap-2">
                        <Badge variant="gray">{paper.year}</Badge>
                        <Badge variant="blue">{paper.venue}</Badge>
                     </div>
                  </div>
               </Card>
            ))}
            
            {/* Add Paper Card */}
            <button className="p-5 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all gap-2 h-full min-h-[120px]">
               <Plus className="w-6 h-6" />
               <span className="font-medium">Add Paper to Collection</span>
            </button>
         </div>
      </div>

      {/* New Collection Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Collection</h3>
              <Input 
                autoFocus
                placeholder="Collection Name e.g. 'Thesis Chapter 1'" 
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="mb-6"
              />
              <div className="flex justify-end gap-3">
                 <Button variant="ghost" onClick={() => setShowNewModal(false)}>Cancel</Button>
                 <Button onClick={handleCreateCollection}>Create Collection</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};