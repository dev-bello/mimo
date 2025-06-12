import React from 'react';
import {
  HomeIcon,
  UserPlusIcon,
  HistoryIcon,
  UserIcon,
  UsersIcon,
  ShieldIcon,
  QrCodeIcon,
  ScanIcon,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = ({ activeView, onViewChange }) => {
  const { user } = useAuth();

  const getNavItems = () => {
    if (user?.role === 'admin') {
      return [
        { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
        { id: 'guards', icon: ShieldIcon, label: 'Guards' },
        { id: 'residents', icon: UserIcon, label: 'Residents' },
        { id: 'history', icon: HistoryIcon, label: 'History' },
      ];
    }

    if (user?.role === 'guard') {
      return [
        { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
        { id: 'scan-code', icon: QrCodeIcon, label: 'Scan Code' },
        { id: 'verify-otp', icon: ScanIcon, label: 'Verify OTP' },
      ];
    }

    if (user?.role === 'resident') {
      return [
        { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
        { id: 'invite-visitor', icon: UserPlusIcon, label: 'Invite Visitor' },
        { id: 'my-invites', icon: UsersIcon, label: 'My Invites' },
      ];
    }

    return [{ id: 'dashboard', icon: HomeIcon, label: 'Dashboard' }];
  };

  const navItems = getNavItems();

  return (
    <nav className="w-full lg:w-[147px] bg-[#393e46] rounded-[7px] p-4 lg:py-11 flex flex-row lg:flex-col items-center lg:items-center overflow-x-auto lg:overflow-x-visible">
      <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 w-full">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full lg:w-[122px] h-[60px] lg:h-[117px] 
                flex flex-col items-center justify-center 
                relative transition-colors flex-shrink-0
                ${isActive ? 'bg-[#948979]' : 'hover:bg-[#4a5058]'}
                ${!isActive ? 'border border-solid border-[#948979]' : ''}
                rounded lg:rounded-none
                min-w-[80px] lg:min-w-0
              `}
              title={item.label}
            >
              <IconComponent className="w-6 h-6 lg:w-10 lg:h-10 text-[#e8eaed] mb-1 lg:mb-2" />
              <span className="text-xs text-[#e8eaed] text-center font-medium px-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};