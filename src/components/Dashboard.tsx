import React from 'react';
import { DollarSign, Package, Building2, ClipboardList, AlertTriangle } from 'lucide-react';
import type { DashboardStats } from '../types';

interface DashboardProps {
  stats: DashboardStats;
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.totalItems}
              </p>
            </div>
            <Package className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.departmentCount}
              </p>
            </div>
            <Building2 className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Items</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.availableItems}
              </p>
            </div>
            <ClipboardList className="text-indigo-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Status Distribution</h3>
          <div className="space-y-4">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      status === 'available' ? 'bg-green-500' :
                      status === 'in-use' ? 'bg-blue-500' :
                      status === 'maintenance' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{
                      width: `${(count / stats.totalItems) * 100}%`
                    }}
                  />
                </div>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 min-w-[4rem]">
                  {count} {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Inventory</h3>
          <div className="space-y-4">
            {stats.recentInventory.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between border-b dark:border-gray-700 pb-2"
              >
                <div className="flex items-center space-x-2">
                  {record.status === 'missing' || record.status === 'damaged' ? (
                    <AlertTriangle className="text-red-500" size={18} />
                  ) : (
                    <ClipboardList className="text-green-500" size={18} />
                  )}
                  <span className="text-gray-900 dark:text-white">{record.notes}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Department Values</h3>
        <div className="space-y-4">
          {stats.departmentValues.map((dept) => (
            <div key={dept.name} className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white">{dept.name}</span>
              <span className="text-gray-600 dark:text-gray-400">
                ${dept.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}