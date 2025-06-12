import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { LogOutIcon, UserIcon } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'guard': return 'text-blue-400';
      case 'resident': return 'text-green-400';
      default: return 'text-[#e8eaed]';
    }
  };

  return (
    <header className="w-full h-auto lg:h-[118px] bg-[#393e46] rounded-[7px] shadow-[0px_14px_4px_#00000040] mb-3 flex flex-col lg:flex-row items-center justify-between p-4 lg:px-6">
      <h1 className="[font-family:'Kumar_One',Helvetica] font-normal text-[#dfd0b8] text-2xl lg:text-[64px] tracking-[0] leading-normal mb-4 lg:mb-0 text-center lg:text-left">
        Visitor History
      </h1>
      
      {user && (
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-[#e8eaed]">
            <UserIcon className="w-5 h-5" />
            <div className="text-center lg:text-right">
              <div className="text-sm font-medium">{user.name}</div>
              <div className={`text-xs uppercase font-bold ${getRoleColor(user.role)}`}>
                {user.role}
              </div>
            </div>
          </div>
          
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="bg-transparent border-[#948979] text-[#e8eaed] hover:bg-[#948979] hover:text-white w-full lg:w-auto"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};