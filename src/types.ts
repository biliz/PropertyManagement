export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Property {
  id: string;
  name: string;
  departmentId: string;
  serialNumber: string;
  purchaseDate: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  lastInventoryDate: string;
  notes: string;
  value: number;
}

export interface InventoryRecord {
  id: string;
  propertyId: string;
  date: string;
  status: 'found' | 'missing' | 'damaged';
  notes: string;
}

export interface DashboardStats {
  totalValue: number;
  totalItems: number;
  availableItems: number;
  departmentCount: number;
  recentInventory: InventoryRecord[];
  statusDistribution: Record<Property['status'], number>;
  departmentValues: { name: string; value: number }[];
}