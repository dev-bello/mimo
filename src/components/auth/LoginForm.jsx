import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@example.com', password: 'admin123' },
    { role: 'Guard', email: 'guard001@example.com', password: 'guard123' },
    { role: 'Resident', email: 'resident001@example.com', password: 'resident123' }
  ];

  return (
    <div className="min-h-screen bg-[#222831] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#393e46] border-[#948979]">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold text-[#dfd0b8] font-['Kumar_One',Helvetica]">
            Visitor Management System
          </h1>
          <p className="text-[#e8eaed] text-sm">Sign in to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#e8eaed] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#e8eaed] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#e0d0d0] border border-[#948979] rounded-md text-[#393e46] focus:outline-none focus:ring-2 focus:ring-[#948979]"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#948979] hover:bg-[#7a6f5f] text-white"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#948979]">
            <p className="text-xs text-[#e8eaed] mb-2 text-center">Demo Credentials:</p>
            <div className="space-y-1">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="text-xs text-[#e8eaed] bg-[#2a2f36] p-2 rounded">
                  <strong>{cred.role}:</strong> {cred.email} / {cred.password}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};