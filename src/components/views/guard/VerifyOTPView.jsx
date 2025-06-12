import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { KeyIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

export const VerifyOTPView = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationResult, setVerificationResult] = useState(null);
  const [recentVerifications, setRecentVerifications] = useState([
    { otp: '123456', name: 'Sarah Wilson', time: '11:15 AM', status: 'success' },
    { otp: '654321', name: 'Unknown', time: '10:45 AM', status: 'failed' },
    { otp: '789012', name: 'David Chen', time: '10:20 AM', status: 'success' },
  ]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      // Simulate OTP verification
      setTimeout(() => {
        if (otpString === '123456') {
          const result = {
            success: true,
            message: 'OTP verified successfully!',
            visitorInfo: {
              name: 'Sarah Wilson',
              resident: 'John Resident (A-101)',
              purpose: 'Personal Visit',
              validUntil: '2024-01-16 14:00'
            }
          };
          setVerificationResult(result);
          
          // Add to recent verifications
          setRecentVerifications(prev => [{
            otp: otpString,
            name: result.visitorInfo.name,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'success'
          }, ...prev.slice(0, 4)]);
        } else {
          const result = {
            success: false,
            message: 'Invalid OTP. Please check and try again.'
          };
          setVerificationResult(result);
          
          // Add to recent verifications
          setRecentVerifications(prev => [{
            otp: otpString,
            name: 'Unknown',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'failed'
          }, ...prev.slice(0, 4)]);
        }
      }, 1000);
    }
  };

  const resetOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setVerificationResult(null);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
        OTP Verification
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader className="text-center">
            <KeyIcon className="w-12 h-12 text-[#948979] mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
              Enter 6-Digit OTP
            </h3>
            <p className="text-sm text-[#948979]">
              Ask the visitor for their 6-digit verification code
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-[#e0d0d0] border-2 border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979] focus:border-transparent"
                  maxLength={1}
                />
              ))}
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={!isOtpComplete}
              className="w-full bg-[#948979] hover:bg-[#7a6f5f] text-white disabled:opacity-50"
            >
              Verify OTP
            </Button>
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
              Recent Verifications
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentVerifications.map((verification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#2a2f36] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      verification.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <div>
                      <p className="text-[#e8eaed] font-medium font-mono">{verification.otp}</p>
                      <p className="text-[#948979] text-sm">{verification.name}</p>
                    </div>
                  </div>
                  <div className="text-[#948979] text-sm">{verification.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <Card className={`border-2 ${verificationResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {verificationResult.success ? (
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              ) : (
                <XCircleIcon className="w-8 h-8 text-red-600" />
              )}
              <h3 className={`text-lg font-semibold ${verificationResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {verificationResult.message}
              </h3>
            </div>

            {verificationResult.success && verificationResult.visitorInfo && (
              <div className="bg-white p-4 rounded-lg border mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Visitor Information:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-800">{verificationResult.visitorInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Visiting:</span>
                    <span className="text-gray-800">{verificationResult.visitorInfo.resident}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Purpose:</span>
                    <span className="text-gray-800">{verificationResult.visitorInfo.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Valid Until:</span>
                    <span className="text-gray-800">{verificationResult.visitorInfo.validUntil}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={resetOtp}
              className="w-full bg-[#948979] hover:bg-[#7a6f5f] text-white"
            >
              Verify Another OTP
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-[#393e46] border-[#948979]">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
            Instructions
          </h3>
        </CardHeader>
        <CardContent>
          <ul className="text-[#e8eaed] space-y-2 text-sm">
            <li>• Ask the visitor to provide their 6-digit OTP code</li>
            <li>• Enter each digit in the corresponding box</li>
            <li>• The system will automatically verify the code</li>
            <li>• Valid OTPs will show visitor information and visiting details</li>
            <li>• For demo purposes, use OTP: <strong className="text-[#948979]">123456</strong></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};