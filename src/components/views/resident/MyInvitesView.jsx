import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { EyeIcon, XCircleIcon, SearchIcon, FilterIcon, CalendarIcon } from 'lucide-react';
import { mockVisitorInvites } from '../../../contexts/AuthContext';

export const MyInvitesView = () => {
  const [invites, setInvites] = useState(mockVisitorInvites);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleCancelInvite = (id) => {
    setInvites(invites.map(invite => 
      invite.id === id ? { ...invite, status: 'expired' } : invite
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter invites based on search term, status, and date
  const filteredInvites = invites.filter(invite => {
    const matchesSearch = invite.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invite.visitorPhone.includes(searchTerm) ||
                         invite.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invite.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || invite.status === statusFilter;
    
    const matchesDate = !dateFilter || invite.visitDate === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const statusOptions = ['pending', 'approved', 'expired'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
          My Visitor Invitations
        </h2>
        <div className="text-sm text-[#948979]">
          Total Invites: {invites.length}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#393e46] border-[#948979]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {invites.filter(i => i.status === 'approved').length}
            </div>
            <div className="text-sm text-[#e8eaed]">Approved</div>
          </CardContent>
        </Card>
        <Card className="bg-[#393e46] border-[#948979]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {invites.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-sm text-[#e8eaed]">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-[#393e46] border-[#948979]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {invites.filter(i => i.status === 'expired').length}
            </div>
            <div className="text-sm text-[#e8eaed]">Expired</div>
          </CardContent>
        </Card>
        <Card className="bg-[#393e46] border-[#948979]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {invites.filter(i => new Date(i.visitDate) >= new Date()).length}
            </div>
            <div className="text-sm text-[#e8eaed]">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="bg-[#393e46] border-[#948979]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#948979] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by visitor name, phone, code, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon className="text-[#948979] w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-[#948979] w-4 h-4" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
              />
            </div>
            {(searchTerm || statusFilter || dateFilter) && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setDateFilter('');
                }}
                variant="outline"
                className="border-[#948979] text-[#e8eaed] hover:bg-[#948979]"
              >
                Clear Filters
              </Button>
            )}
          </div>
          <div className="mt-2 text-sm text-[#948979]">
            Showing {filteredInvites.length} of {invites.length} invitations
          </div>
        </CardContent>
      </Card>

      {/* Invites Table */}
      <Card className="bg-[#393e46] border-[#948979]">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
            Recent Invitations
          </h3>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#948979]">
              <TableRow>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Visitor</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Phone</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Date</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Time</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Purpose</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Code</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Status</TableHead>
                <TableHead className="text-center font-['Koulen',Helvetica] text-[#1e1e1e]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvites.map((invite, index) => (
                <TableRow
                  key={invite.id}
                  className={index % 2 === 0 ? "bg-[#e8e3e39e]" : "bg-[#e8e3e39e] shadow-[0px_4px_20px_#6e4a4a70]"}
                >
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {invite.visitorName}
                  </TableCell>
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {invite.visitorPhone}
                  </TableCell>
                  <TableCell className="text-center font-['Stick',Helvetica] text-[#393e46] text-[11px]">
                    {new Date(invite.visitDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center font-['Stick',Helvetica] text-[#393e46] text-[11px]">
                    {invite.visitTime}
                  </TableCell>
                  <TableCell className="text-center font-['Koulen',Helvetica] text-[#000000]">
                    {invite.purpose}
                  </TableCell>
                  <TableCell className="text-center">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                      {invite.code}
                    </code>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getStatusColor(invite.status)} border-none font-['Koulen',Helvetica]`}>
                      {invite.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                        <EyeIcon className="w-3 h-3" />
                      </Button>
                      {invite.status !== 'expired' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelInvite(invite.id)}
                          className="bg-red-500 hover:bg-red-600 text-white border-none"
                        >
                          <XCircleIcon className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredInvites.length === 0 && (
            <div className="text-center py-8 text-[#948979]">
              No invitations found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};