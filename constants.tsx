
import { Paper, Insight, Collection, Activity } from './types';
import React from 'react';
import { BookOpen, Brain, Clock, FileText, Sparkles, Target } from 'lucide-react';

export const MOCK_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Vaswani et al.'],
    venue: 'NeurIPS',
    year: 2017,
    citations: 85002,
    abstract: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    tags: ['NLP', 'Deep Learning'],
  },
  {
    id: '2',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['He et al.'],
    venue: 'CVPR',
    year: 2016,
    citations: 152000,
    abstract: 'We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.',
    tags: ['Computer Vision', 'CNN'],
  },
  {
    id: '3',
    title: 'Language Models are Few-Shot Learners',
    authors: ['Brown et al.'],
    venue: 'NeurIPS',
    year: 2020,
    citations: 18000,
    abstract: 'We demonstrate that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches.',
    tags: ['LLM', 'Generative AI'],
  },
  {
    id: '4',
    title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
    authors: ['Dosovitskiy et al.'],
    venue: 'ICLR',
    year: 2021,
    citations: 12000,
    abstract: 'We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.',
    tags: ['Vision Transformer', 'Deep Learning'],
  }
];

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    title: 'Self-attention efficiency',
    content: 'The quadratic complexity of self-attention is a major bottleneck for long sequences. Need to investigate linear attention approximations.',
    type: 'limitation',
    status: 'in-progress',
    paperId: '1',
    comments: [
      { id: 'c1', user: 'John Doe', content: 'Check out the Linformer paper.', timestamp: '2 days ago' }
    ],
    todos: [
      { id: 't1', text: 'Read "Attention is not all you need"', completed: true },
      { id: 't2', text: 'Benchmark standard attention on 4k sequence', completed: false },
      { id: 't3', text: 'Draft comparison table', completed: false }
    ]
  },
  {
    id: '2',
    title: 'ResNet Skip Connections',
    content: 'The identity shortcut connection is crucial for gradient flow in very deep networks.',
    type: 'finding',
    status: 'done',
    paperId: '2',
    todos: [
      { id: 't1', text: 'Verify gradient flow in shallow networks', completed: true }
    ]
  },
  {
    id: '3',
    title: 'Prompt Engineering Strategy',
    content: 'Develop a framework for automated prompt optimization based on few-shot examples.',
    type: 'idea',
    status: 'backlog',
    todos: []
  },
  {
    id: '4',
    title: 'ViT vs CNN Robustness',
    content: 'Compare the robustness of Vision Transformers against adversarial attacks compared to traditional CNNs.',
    type: 'methodology',
    status: 'review',
    paperId: '4',
    todos: [
      { id: 't1', text: 'Set up adversarial attack pipeline', completed: true },
      { id: 't2', text: 'Run tests on ImageNet-C', completed: true },
      { id: 't3', text: 'Analyze failure modes', completed: false }
    ]
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: '1', name: 'Large Language Models', count: 14, color: 'bg-blue-500' },
  { id: '2', name: 'Computer Vision', count: 8, color: 'bg-purple-500' },
  { id: '3', name: 'Reinforcement Learning', count: 5, color: 'bg-emerald-500' },
  { id: '4', name: 'Thesis References', count: 32, color: 'bg-amber-500' },
];

export const RECENT_ACTIVITY: Activity[] = [
  { id: '1', user: 'You', action: 'generated a summary for', target: 'Attention Is All You Need', time: '2 mins ago', type: 'ai' },
  { id: '2', user: 'You', action: 'added a note to', target: 'Deep Residual Learning', time: '1 hour ago', type: 'insight' },
  { id: '3', user: 'System', action: 'synced 12 papers from', target: 'Zotero', time: '3 hours ago', type: 'upload' },
  { id: '4', user: 'You', action: 'created collection', target: 'Generative Agents', time: 'Yesterday', type: 'collection' },
];

export const STAT_CARDS = [
  { label: 'Total Papers', value: '142', change: '+12%', icon: <BookOpen className="w-5 h-5 text-blue-600" />, color: 'bg-blue-50' },
  { label: 'AI Insights', value: '84', change: '+24%', icon: <Brain className="w-5 h-5 text-purple-600" />, color: 'bg-purple-50' },
  { label: 'Reading Hours', value: '32.5', change: '-5%', icon: <Clock className="w-5 h-5 text-amber-600" />, color: 'bg-amber-50' },
  { label: 'Collections', value: '12', change: '+2', icon: <Target className="w-5 h-5 text-emerald-600" />, color: 'bg-emerald-50' },
];