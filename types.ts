
export type NavView = 'landing' | 'dashboard' | 'search' | 'library' | 'paper' | 'pdf' | 'collections' | 'insights' | 'write' | 'settings' | 'papers';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citations: number;
  abstract: string;
  tags: string[];
  pdfUrl?: string;
  externalUrl?: string;
  doi?: string;
  status?: 'read' | 'unread' | 'reading';
}

export interface InsightComment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

export interface InsightTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  type: 'finding' | 'methodology' | 'limitation' | 'idea';
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  paperId?: string;
  comments?: InsightComment[];
  todos?: InsightTodo[];
}

export interface Collection {
  id: string;
  name: string;
  count: number;
  color: string;
  parentId?: string;
  subCollections?: Collection[];
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'upload' | 'ai' | 'collection' | 'insight';
}

export type BlockType = 'h1' | 'h2' | 'p' | 'quote' | 'image' | 'list';

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
}

export interface Document {
  id: string;
  title: string;
  updatedAt: string;
  blocks: EditorBlock[];
}