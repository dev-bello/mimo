import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  FilterIcon,
  HomeIcon,
  UserIcon,
  BuildingIcon,
} from "lucide-react";
import { mockResidents } from "../../../contexts/AuthContext";

export const ResidentManagement = () => {
  const [residents, setResidents] = useState(mockResidents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [apartmentFilter, setApartmentFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    apartmentNumber: "",
  });

  const generateUniqueId = () => {
    const lastId =
      residents.length > 0
        ? Math.max(
            ...residents.map((r) => parseInt(r.uniqueId.replace("RES", "")))
          )
        : 0;
    return `RES${String(lastId + 1).padStart(3, "0")}`;
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
    setFormData({ name: "", email: "", apartmentNumber: "" });
    setShowAddForm(false);
  };

  const handleDeleteResident = (id) => {
    setResidents(residents.filter((resident) => resident.id !== id));
  };

  // Filter residents based on search term and apartment filter
  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesApartment =
      !apartmentFilter ||
      resident.apartmentNumber
        .toLowerCase()
        .includes(apartmentFilter.toLowerCase());

    return matchesSearch && matchesApartment;
  });

  // Get unique apartment blocks for filtering
  const apartmentBlocks = [
    ...new Set(residents.map((r) => r.apartmentNumber.charAt(0))),
  ].sort();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6 shadow-soft border-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-soft">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-800">
                Resident Management
              </h2>
              <p className="text-neutral-600">
                Manage residents and their apartment details
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="button-primary px-6 py-3 rounded-xl font-semibold"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Resident
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  Total Residents
                </p>
                <p className="text-2xl font-bold text-neutral-800">
                  {residents.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  Occupied Units
                </p>
                <p className="text-2xl font-bold text-neutral-800">
                  {residents.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  Apartment Blocks
                </p>
                <p className="text-2xl font-bold text-neutral-800">
                  {apartmentBlocks.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="glass-effect rounded-2xl shadow-soft border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search residents by name, email, ID, or apartment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern w-full pl-12"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="text-neutral-400 w-5 h-5" />
                <select
                  value={apartmentFilter}
                  onChange={(e) => setApartmentFilter(e.target.value)}
                  className="input-modern min-w-[150px]"
                >
                  <option value="">All Blocks</option>
                  {apartmentBlocks.map((block) => (
                    <option key={block} value={block}>
                      Block {block}
                    </option>
                  ))}
                </select>
              </div>
              {(searchTerm || apartmentFilter) && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setApartmentFilter("");
                  }}
                  variant="outline"
                  className="button-secondary"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        </CardContent>
      </Card>

      {/* Add Form */}
      {showAddForm && (
        <Card className="glass-effect rounded-2xl shadow-soft border-0 animate-slide-down">
          <CardHeader>
            <h3 className="text-xl font-bold font-display text-neutral-800">
              Add New Resident
            </h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddResident} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-modern w-full"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input-modern w-full"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Apartment Number
                </label>
                <input
                  type="text"
                  value={formData.apartmentNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apartmentNumber: e.target.value,
                    })
                  }
                  className="input-modern w-full"
                  placeholder="e.g., A-101, B-205"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="button-primary px-6 py-3 rounded-xl font-semibold"
                >
                  Add Resident
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="button-secondary px-6 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Residents Table */}
      <Card className="table-modern">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="table-header">
              <TableRow>
                <TableHead className="text-center font-semibold">ID</TableHead>
                <TableHead className="text-center font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Apartment
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Created
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident, index) => (
                <TableRow key={resident.id} className="table-row">
                  <TableCell className="text-center font-mono font-semibold text-primary-600">
                    {resident.uniqueId}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-neutral-800">
                    {resident.name}
                  </TableCell>
                  <TableCell className="text-center text-neutral-600">
                    {resident.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="status-badge bg-green-100 text-green-800 border-green-200">
                      {resident.apartmentNumber}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-sm text-neutral-500">
                    {new Date(resident.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2"
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteResident(resident.id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-2"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredResidents.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <HomeIcon className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
              <p className="text-lg font-medium">No residents found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
