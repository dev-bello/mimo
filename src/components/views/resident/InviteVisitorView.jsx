import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { UserPlusIcon, SendIcon, CheckCircleIcon } from 'lucide-react';

export const InviteVisitorView = () => {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    visitDate: '',
    visitTime: '',
    purpose: '',
  });
  const [inviteSent, setInviteSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const generateVisitorCode = () => {
    const codes = ['VIS003', 'VIS004', 'VIS005', 'VIS006'];
    return codes[Math.floor(Math.random() * codes.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate visitor code
    const code = generateVisitorCode();
    setGeneratedCode(code);
    
    // Simulate sending invite
    setTimeout(() => {
      setInviteSent(true);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      visitorName: '',
      visitorPhone: '',
      visitDate: '',
      visitTime: '',
      purpose: '',
    });
    setInviteSent(false);
    setGeneratedCode('');
  };

  if (inviteSent) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
          Visitor Invitation Sent
        </h2>

        <Card className="bg-green-50 border-2 border-green-500 max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Invitation Sent Successfully!
            </h3>
            <p className="text-green-700 mb-4">
              Your visitor has been sent an invitation with the following details:
            </p>
            
            <div className="bg-white p-4 rounded-lg border mb-4">
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Visitor:</span>
                  <span className="text-gray-800">{formData.visitorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="text-gray-800">{formData.visitorPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span className="text-gray-800">{formData.visitDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Time:</span>
                  <span className="text-gray-800">{formData.visitTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Code:</span>
                  <span className="text-gray-800 font-mono font-bold">{generatedCode}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> The visitor will receive an SMS/Email with their unique visitor code and QR code for entry.
              </p>
            </div>

            <Button
              onClick={resetForm}
              className="bg-[#948979] hover:bg-[#7a6f5f] text-white"
            >
              Send Another Invitation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
        Invite Visitor
      </h2>

      <Card className="bg-[#393e46] border-[#948979] max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <UserPlusIcon className="w-12 h-12 text-[#948979] mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
            Send Visitor Invitation
          </h3>
          <p className="text-sm text-[#948979]">
            Fill out the form below to send an invitation to your visitor
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                  Visitor Name *
                </label>
                <input
                  type="text"
                  value={formData.visitorName}
                  onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                  Visitor Phone *
                </label>
                <input
                  type="tel"
                  value={formData.visitorPhone}
                  onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                  Visit Date *
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                  Visit Time *
                </label>
                <input
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e8eaed] mb-1">
                Purpose of Visit *
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46]"
                required
              >
                <option value="">Select purpose</option>
                <option value="Personal Visit">Personal Visit</option>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Delivery">Delivery</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Family Visit">Family Visit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#948979] hover:bg-[#7a6f5f] text-white"
            >
              <SendIcon className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-[#393e46] border-[#948979]">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
            How It Works
          </h3>
        </CardHeader>
        <CardContent>
          <ul className="text-[#e8eaed] space-y-2 text-sm">
            <li>• Fill out the visitor information form above</li>
            <li>• Your visitor will receive an SMS/Email with their unique visitor code</li>
            <li>• The message will include a QR code for easy entry</li>
            <li>• Guards can scan the QR code or manually enter the visitor code</li>
            <li>• The invitation is valid only for the specified date and time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};