import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { mockResidents } from '../../../contexts/AuthContext';

export const ResidentManagement = () => {
  const [residents, setResidents] = useState(mockResidents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [apartmentFilter, setApartmentFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    apartmentNumber: '',
  });

  const generateUniqueId = () => {
    const lastId = residents.length > 0 ? 
      Math.max(...residents.map(r => parseInt(r.uniqueId.replace('RES', '')))) : 0;
    return `RES${String(lastId + 1).padStart(3, '0')}`;
  };

  const handleAddResident = (e) => {
    e.preventDefault();
    const newResident = {
      id: Date.now().toString(),
      uniqueId: generateUniqueId(),
      name: formData.name,
      email: formData.email,
      apartmentNumber: formData.apartmentNumber,
      createdAt: new Date().toISOString(),
    };
    
    setResidents([...residents, newResident]);
    setFormData({ name: '', email: '', apartmentNumber: '' });
    setShowAddForm(false);
  };

  const handleDeleteResident = (id) => {
    setResidents(residents.filter(resident => resident.id !== id));
  };

  // Filter residents based on search term and apartment filter
  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesApartment = !apartmentFilter || 
                            resident.apartmentNumber.toLowerCase().includes(apartmentFilter.toLowerCase());
    
    return matchesSearch && matchesApartment;
  });

  // Get unique apartment blocks for filtering
  const apartmentBlocks = [...new Set(residents.map(r => r.apartmentNumber.charAt(0)))].sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
          Resident Management
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#948979] hover:bg-[#7a6f5f] text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Resident
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="bg-[#393e46] border-[#948979]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#948979] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, ID, or apartment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon className="text-[#948979] w-4 h-4" />
              <select
                value={apartmentFilter}
                onChange={(e) => setApartmentFilter(e.target.value)}
                className="px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
              >
                <option value="">All Blocks</option>
                {apartmentBlocks.map(block => (
                  <option key={block} value={block}>Block {block}</option>
                ))}
              </select>
            </div>
            {(searchTerm || apartmentFilter) && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setApartmentFilter('');
                }}
                variant="outline"
                className="border-[#948979] text-[#e8eaed] hover:bg-[#948979]"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="mt-2 text-sm text-[#948979]">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#e8eaed]">Add New Resident</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddResident} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                  Apartment Number
                </label>
                <input
                  type="text"
                  value={formData.apartmentNumber}
                  onChange={(e) => setFormData({ ...formData, apartmentNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                  placeholder="e.g., A-101, B-205"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-[#948979] hover:bg-[#7a6f5f] text-white">
                  Add Resident
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-[#948979] text-[#e8eaed] hover:bg-[#948979]"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#393e46] border-[#948979]">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#948979]">
              <TableRow>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">ID</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Name</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Email</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Apartment</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Created</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident, index) => (
                <TableRow
                  key={resident.id}
                  className={index % 2 === 0 ? "bg-[#e8e3e39e]" : "bg-[#e8e3e39e] shadow-[0px_4px_20px_#6e4a4a70]"}
                >
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {resident.uniqueId}
                  </TableCell>
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {resident.name}
                  </TableCell>
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {resident.email}
                  </TableCell>
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {resident.apartmentNumber}
                  </TableCell>
                  <TableCell className="text-center font-['Stick',Helvetica] text-[#393e46] text-[11px]">
                    {new Date(resident.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                        <EditIcon className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteResident(resident.id)}
                        className="bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredResidents.length === 0 && (
            <div className="text-center py-8 text-[#948979]">
              No residents found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};