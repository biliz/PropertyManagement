import React, { useState } from 'react';
import { ClipboardCheck, Search } from 'lucide-react';
import type { Property, InventoryRecord } from '../types';

interface InventoryListProps {
  properties: Property[];
  inventoryRecords: InventoryRecord[];
  onAddRecord: (record: Omit<InventoryRecord, 'id'>) => void;
}

export function InventoryList({ properties, inventoryRecords, onAddRecord }: InventoryListProps) {
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecord, setNewRecord] = useState<Omit<InventoryRecord, 'id'>>({
    propertyId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'found',
    notes: '',
  });

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord(newRecord);
    setNewRecord({
      propertyId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'found',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Check</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProperties.map((property) => {
          const latestRecord = inventoryRecords
            .filter((r) => r.propertyId === property.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

          return (
            <div
              key={property.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  <p className="text-gray-600">Serial: {property.serialNumber}</p>
                  <p className="text-gray-600">
                    Last Inventory: {new Date(property.lastInventoryDate).toLocaleDateString()}
                  </p>
                  {latestRecord && (
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${latestRecord.status === 'found' ? 'bg-green-100 text-green-800' :
                        latestRecord.status === 'missing' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                      Last Status: {latestRecord.status.charAt(0).toUpperCase() + latestRecord.status.slice(1)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProperty(property.id)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <ClipboardCheck size={18} />
                  <span>Check</span>
                </button>
              </div>

              {selectedProperty === property.id && (
                <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={newRecord.status}
                        onChange={(e) => setNewRecord({
                          ...newRecord,
                          propertyId: property.id,
                          status: e.target.value as InventoryRecord['status']
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      >
                        <option value="found">Found</option>
                        <option value="missing">Missing</option>
                        <option value="damaged">Damaged</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({
                          ...newRecord,
                          propertyId: property.id,
                          date: e.target.value
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord({
                          ...newRecord,
                          propertyId: property.id,
                          notes: e.target.value
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={3}
                      />
                    </div>
                    <div className="col-span-2 flex space-x-3">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProperty('')}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}