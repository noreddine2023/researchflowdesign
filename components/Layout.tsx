import React, { useState } from 'react';
import { NavView } from '../types';
import { 
  LayoutDashboard, 
  Search, 
  Files, 
  FolderTree, 
  Lightbulb, 
  PenTool, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Sparkles,
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from './ui/Common';

interface LayoutProps {
  currentView: NavView;
  onChangeView: (view: NavView) => void;
  children: React.ReactNode;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick,
  collapsed 
}: { 
  icon: React.ElementType, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  collapsed: boolean
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
      ${active 
        ? 'bg-blue-50 text-blue-700 shadow-sm' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }
    `}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {active && !collapsed && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white/80 backdrop-blur-xl border-r border-slate-200 transition-all duration-300 flex flex-col z-20
          ${collapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                ResearchFlow
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <div className={`px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? 'Main' : 'Research'}
          </div>
          
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onChangeView('dashboard')}
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Search} 
            label="Search Papers" 
            active={currentView === 'search'} 
            onClick={() => onChangeView('search')}
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Files} 
            label="My Library" 
            active={currentView === 'papers'} 
            onClick={() => onChangeView('papers')}
            collapsed={collapsed}
          />

          <div className={`mt-6 px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? 'Work' : 'Workspace'}
          </div>

          <SidebarItem 
            icon={FolderTree} 
            label="Collections" 
            active={currentView === 'collections'} 
            onClick={() => onChangeView('collections')}
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={Lightbulb} 
            label="Insights" 
            active={currentView === 'insights'} 
            onClick={() => onChangeView('insights')}
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={PenTool} 
            label="Writing Assistant" 
            active={currentView === 'write'} 
            onClick={() => onChangeView('write')}
            collapsed={collapsed}
          />
        </div>

        <div className="p-3 border-t border-slate-100 space-y-1">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => onChangeView('settings')}
            collapsed={collapsed}
          />
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg mt-2"
           >
             <Menu className="w-5 h-5" />
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 bg-white/50 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          {/* Breadcrumbs / Context */}
          <div className="flex items-center text-sm text-slate-500">
            <span className="hover:text-slate-800 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-medium text-slate-900 capitalize">{currentView}</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <span className="mr-2">⌘ K</span> Quick Actions
            </Button>
            
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              <Bell className="w-5 h-5 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors" />
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            
            <button 
              className="flex items-center gap-3 hover:bg-slate-100 p-1.5 pr-3 rounded-full transition-colors group"
              onClick={() => onChangeView('settings')}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center shadow-md">
                <span className="text-xs font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 hidden md:block">John Doe</span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
