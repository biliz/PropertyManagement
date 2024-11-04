import React from 'react';
import { Building2, ClipboardList, Package } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavProps) {
  const tabs = [
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'properties', label: 'Properties', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: ClipboardList },
  ];

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">AssetTrack Pro</h1>
            <div className="flex space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                      ${
                        activeTab === tab.id
                          ? 'bg-indigo-700 text-white'
                          : 'text-indigo-100 hover:bg-indigo-500'
                      }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}