import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Button, Badge } from '../components/ui/Common';
import { STAT_CARDS, RECENT_ACTIVITY, MOCK_PAPERS } from '../constants';
import { ArrowUpRight, Calendar, ChevronRight, FileText } from 'lucide-react';
import { NavView } from '../types';

interface DashboardProps {
  onNavigate: (view: NavView, id?: string) => void;
}

const data = [
  { name: 'Mon', papers: 4, insights: 2 },
  { name: 'Tue', papers: 3, insights: 5 },
  { name: 'Wed', papers: 7, insights: 8 },
  { name: 'Thu', papers: 5, insights: 4 },
  { name: 'Fri', papers: 9, insights: 12 },
  { name: 'Sat', papers: 6, insights: 6 },
  { name: 'Sun', papers: 4, insights: 3 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Overview</h1>
          <p className="text-slate-500 mt-2">Welcome back, John. Here is your research progress for today.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" onClick={() => onNavigate('search')}>Find Papers</Button>
            <Button onClick={() => onNavigate('write')}>New Draft</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((stat, index) => (
          <Card key={index} className="p-5 flex items-start justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              <div className="flex items-center mt-2 text-xs font-medium">
                <span className={`px-1.5 py-0.5 rounded text-emerald-700 bg-emerald-50`}>{stat.change}</span>
                <span className="text-slate-400 ml-2">vs last week</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-50 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Research Activity</h3>
              <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1 text-slate-600 focus:ring-0 cursor-pointer hover:bg-slate-100">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)'}}
                    itemStyle={{fontSize: '12px', fontWeight: 500}}
                  />
                  <Area type="monotone" dataKey="papers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPapers)" />
                  <Area type="monotone" dataKey="insights" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorInsights)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Papers</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('papers')}>View All <ArrowUpRight className="ml-1 w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {MOCK_PAPERS.slice(0, 2).map((paper) => (
                <Card key={paper.id} className="p-5 hover:border-blue-200 transition-colors group cursor-pointer" onClick={() => onNavigate('pdf', paper.id)}>
                   <div className="flex justify-between items-start mb-3">
                      <Badge variant="blue">{paper.venue}</Badge>
                      <span className="text-xs text-slate-400">{paper.year}</span>
                   </div>
                   <h4 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{paper.title}</h4>
                   <p className="text-sm text-slate-500 mb-4 line-clamp-2">{paper.abstract}</p>
                   <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="text-xs text-slate-400">{paper.authors[0]}</div>
                      <div className="text-xs font-medium text-slate-600 flex items-center">
                        Read Paper <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                   </div>
                </Card>
             ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <Card className="p-6 h-full">
             <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity Feed</h3>
             <div className="space-y-6 relative">
                {/* Timeline Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>

                {RECENT_ACTIVITY.map((activity, i) => (
                   <div key={activity.id} className="relative pl-8 group">
                      <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 
                         ${activity.type === 'ai' ? 'bg-purple-100' : 
                           activity.type === 'collection' ? 'bg-emerald-100' : 
                           activity.type === 'insight' ? 'bg-amber-100' : 'bg-blue-100'
                         }`}
                      >
                         <div className={`w-2 h-2 rounded-full 
                            ${activity.type === 'ai' ? 'bg-purple-500' : 
                              activity.type === 'collection' ? 'bg-emerald-500' : 
                              activity.type === 'insight' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}
                         ></div>
                      </div>
                      <div className="text-sm">
                         <span className="font-medium text-slate-900">{activity.user}</span>{' '}
                         <span className="text-slate-500">{activity.action}</span>{' '}
                         <span className="font-medium text-blue-600 cursor-pointer hover:underline">{activity.target}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{activity.time}</div>
                   </div>
                ))}
             </div>
             <Button variant="ghost" className="w-full mt-6 text-slate-500">View All History</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
