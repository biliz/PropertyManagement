import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DepartmentList } from './components/DepartmentList';
import { PropertyList } from './components/PropertyList';
import { InventoryList } from './components/InventoryList';
import { ThemeToggle } from './components/ThemeToggle';
import { calculateDashboardStats } from './utils/statsCalculator';
import { sampleDepartments, sampleProperties, sampleInventoryRecords } from './data/sampleData';
import type { Department, Property, InventoryRecord } from './types';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [departments, setDepartments] = useState<Department[]>(sampleDepartments);
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [inventoryRecords, setInventoryRecords] = useState<InventoryRecord[]>(sampleInventoryRecords);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Department handlers
  const handleAddDepartment = (dept: Omit<Department, 'id'>) => {
    const newDept = { ...dept, id: crypto.randomUUID() };
    setDepartments([...departments, newDept]);
  };

  const handleEditDepartment = (dept: Department) => {
    setDepartments(departments.map((d) => (d.id === dept.id ? dept : d)));
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
    setProperties(properties.filter((p) => p.departmentId !== id));
  };

  // Property handlers
  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = { ...property, id: crypto.randomUUID() };
    setProperties([...properties, newProperty]);
  };

  const handleEditProperty = (property: Property) => {
    setProperties(properties.map((p) => (p.id === property.id ? property : p)));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
    setInventoryRecords(inventoryRecords.filter((r) => r.propertyId !== id));
  };

  // Inventory handlers
  const handleAddInventoryRecord = (record: Omit<InventoryRecord, 'id'>) => {
    const newRecord = { ...record, id: crypto.randomUUID() };
    setInventoryRecords([...inventoryRecords, newRecord]);
    
    const property = properties.find((p) => p.id === record.propertyId);
    if (property) {
      handleEditProperty({
        ...property,
        lastInventoryDate: record.date,
        status: record.status === 'missing' ? 'maintenance' : property.status,
      });
    }
  };

  const stats = calculateDashboardStats(departments, properties, inventoryRecords);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}
        
        {activeTab === 'departments' && (
          <DepartmentList
            departments={departments}
            onAdd={handleAddDepartment}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        )}
        
        {activeTab === 'properties' && (
          <PropertyList
            properties={properties}
            departments={departments}
            onAdd={handleAddProperty}
            onEdit={handleEditProperty}
            onDelete={handleDeleteProperty}
          />
        )}
        
        {activeTab === 'inventory' && (
          <InventoryList
            properties={properties}
            inventoryRecords={inventoryRecords}
            onAddRecord={handleAddInventoryRecord}
          />
        )}
      </main>
    </div>
  );
}

export default App;