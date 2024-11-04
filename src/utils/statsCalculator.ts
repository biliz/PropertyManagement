import type { Department, Property, InventoryRecord, DashboardStats } from '../types';

export function calculateDashboardStats(
  departments: Department[],
  properties: Property[],
  inventoryRecords: InventoryRecord[]
): DashboardStats {
  const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const totalItems = properties.length;
  const availableItems = properties.filter(p => p.status === 'available').length;
  
  const statusDistribution = properties.reduce((acc, prop) => {
    acc[prop.status] = (acc[prop.status] || 0) + 1;
    return acc;
  }, {} as Record<Property['status'], number>);

  const departmentValues = departments.map(dept => ({
    name: dept.name,
    value: properties
      .filter(prop => prop.departmentId === dept.id)
      .reduce((sum, prop) => sum + prop.value, 0)
  }));

  const recentInventory = [...inventoryRecords]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    totalValue,
    totalItems,
    availableItems,
    departmentCount: departments.length,
    recentInventory,
    statusDistribution,
    departmentValues,
  };
}