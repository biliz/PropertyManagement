import { Department, Property, InventoryRecord } from '../types';

export const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'IT Department',
    description: 'Information Technology and Systems',
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Marketing and Communications',
  },
  {
    id: '3',
    name: 'Engineering',
    description: 'Product Engineering and Development',
  },
];

export const sampleProperties: Property[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    departmentId: '1',
    serialNumber: 'MBP2023001',
    purchaseDate: '2023-01-15',
    status: 'in-use',
    lastInventoryDate: '2024-02-01',
    notes: 'Assigned to Development Team Lead',
    value: 2499,
  },
  {
    id: '2',
    name: 'Dell XPS 15',
    departmentId: '1',
    serialNumber: 'XPS2023002',
    purchaseDate: '2023-02-20',
    status: 'available',
    lastInventoryDate: '2024-02-01',
    notes: 'Backup development machine',
    value: 1899,
  },
  {
    id: '3',
    name: 'Canon EOS R5',
    departmentId: '2',
    serialNumber: 'CAN2023003',
    purchaseDate: '2023-03-10',
    status: 'in-use',
    lastInventoryDate: '2024-02-01',
    notes: 'Primary camera for product shoots',
    value: 3899,
  },
  {
    id: '4',
    name: 'Oscilloscope',
    departmentId: '3',
    serialNumber: 'OSC2023004',
    purchaseDate: '2023-04-05',
    status: 'maintenance',
    lastInventoryDate: '2024-02-01',
    notes: 'Needs calibration',
    value: 5999,
  },
];

export const sampleInventoryRecords: InventoryRecord[] = [
  {
    id: '1',
    propertyId: '1',
    date: '2024-02-01',
    status: 'found',
    notes: 'Regular inventory check',
  },
  {
    id: '2',
    propertyId: '2',
    date: '2024-02-01',
    status: 'found',
    notes: 'Regular inventory check',
  },
  {
    id: '3',
    propertyId: '3',
    date: '2024-02-01',
    status: 'found',
    notes: 'Regular inventory check',
  },
  {
    id: '4',
    propertyId: '4',
    date: '2024-02-01',
    status: 'damaged',
    notes: 'Calibration required',
  },
];