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
  ShieldIcon,
  UserIcon,
  ClockIcon,
} from "lucide-react";
import { mockGuards } from "../../../contexts/AuthContext";

export const GuardManagement = () => {
  const [guards, setGuards] = useState(mockGuards);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shiftSchedule: "",
  });

  const generateUniqueId = () => {
    const lastId =
      guards.length > 0
        ? Math.max(
            ...guards.map((g) => parseInt(g.uniqueId.replace("GRD", "")))
          )
        : 0;
    return `GRD${String(lastId + 1).padStart(3, "0")}`;
  };

  const handleAddGuard = (e) => {
    e.preventDefault();
    const newGuard = {
      id: Date.now().toString(),
      uniqueId: generateUniqueId(),
      name: formData.name,
      email: formData.email,
      shiftSchedule: formData.shiftSchedule,
      createdAt: new Date().toISOString(),
    };

    setGuards([...guards, newGuard]);
    setFormData({ name: "", email: "", shiftSchedule: "" });
    setShowAddForm(false);
  };

  const handleDeleteGuard = (id) => {
    setGuards(guards.filter((guard) => guard.id !== id));
  };

  // Filter guards based on search term and shift filter
  const filteredGuards = guards.filter((guard) => {
    const matchesSearch =
      guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guard.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guard.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesShift = !shiftFilter || guard.shiftSchedule === shiftFilter;

    return matchesSearch && matchesShift;
  });

  const shiftOptions = [
    "Morning (6AM - 2PM)",
    "Evening (2PM - 10PM)",
    "Night (10PM - 6AM)",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6 shadow-soft border-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-soft">
              <ShieldIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-800">
                Guard Management
              </h2>
              <p className="text-neutral-600">
                Manage security personnel and their schedules
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="button-primary px-6 py-3 rounded-xl font-semibold"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Guard
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
                  Total Guards
                </p>
                <p className="text-2xl font-bold text-neutral-800">
                  {guards.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">On Duty</p>
                <p className="text-2xl font-bold text-neutral-800">5</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
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
                placeholder="Search guards by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern w-full pl-12"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="text-neutral-400 w-5 h-5" />
                <select
                  value={shiftFilter}
                  onChange={(e) => setShiftFilter(e.target.value)}
                  className="input-modern min-w-[200px]"
                >
                  <option value="">All Shifts</option>
                  {shiftOptions.map((shift) => (
                    <option key={shift} value={shift}>
                      {shift}
                    </option>
                  ))}
                </select>
              </div>
              {(searchTerm || shiftFilter) && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setShiftFilter("");
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
            Showing {filteredGuards.length} of {guards.length} guards
          </div>
        </CardContent>
      </Card>

      {/* Add Form */}
      {showAddForm && (
        <Card className="glass-effect rounded-2xl shadow-soft border-0 animate-slide-down">
          <CardHeader>
            <h3 className="text-xl font-bold font-display text-neutral-800">
              Add New Guard
            </h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGuard} className="space-y-6">
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
                  Shift Schedule
                </label>
                <select
                  value={formData.shiftSchedule}
                  onChange={(e) =>
                    setFormData({ ...formData, shiftSchedule: e.target.value })
                  }
                  className="input-modern w-full"
                  required
                >
                  <option value="">Select Shift</option>
                  {shiftOptions.map((shift) => (
                    <option key={shift} value={shift}>
                      {shift}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="button-primary px-6 py-3 rounded-xl font-semibold"
                >
                  Add Guard
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

      {/* Guards Table */}
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
                  Shift
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
              {filteredGuards.map((guard, index) => (
                <TableRow key={guard.id} className="table-row">
                  <TableCell className="text-center font-mono font-semibold text-primary-600">
                    {guard.uniqueId}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-neutral-800">
                    {guard.name}
                  </TableCell>
                  <TableCell className="text-center text-neutral-600">
                    {guard.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="status-badge bg-blue-100 text-blue-800 border-blue-200">
                      {guard.shiftSchedule}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-sm text-neutral-500">
                    {new Date(guard.createdAt).toLocaleDateString()}
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
                        onClick={() => handleDeleteGuard(guard.id)}
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
          {filteredGuards.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <ShieldIcon className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
              <p className="text-lg font-medium">No guards found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
