import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UsersIcon, 
  UserCheckIcon, 
  ClockIcon, 
  AlertTriangleIcon,
  TrendingUpIcon,
  CalendarIcon,
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  ShieldIcon,
  UserPlusIcon,
  QrCodeIcon
} from 'lucide-react';

export const DashboardView = ({ onViewChange }) => {
  const { user } = useAuth();

  const getDashboardStats = () => {
    if (user?.role === 'admin') {
      return [
        { title: 'Total Visitors Today', value: '24', icon: UsersIcon, color: 'text-blue-400' },
        { title: 'Active Guards', value: '8', icon: UserCheckIcon, color: 'text-green-400' },
        { title: 'Pending Approvals', value: '3', icon: ClockIcon, color: 'text-yellow-400' },
        { title: 'Security Alerts', value: '1', icon: AlertTriangleIcon, color: 'text-red-400' },
      ];
    }

    if (user?.role === 'guard') {
      return [
        { title: 'Visitors Processed', value: '12', icon: UserCheckIcon, color: 'text-green-400' },
        { title: 'Pending Verifications', value: '2', icon: ClockIcon, color: 'text-yellow-400' },
        { title: 'Hours on Duty', value: '6', icon: TrendingUpIcon, color: 'text-blue-400' },
        { title: 'Shift Ends', value: '4:00 PM', icon: CalendarIcon, color: 'text-purple-400' },
      ];
    }

    if (user?.role === 'resident') {
      return [
        { title: 'Expected Visitors', value: '2', icon: UsersIcon, color: 'text-blue-400' },
        { title: 'Visitors This Week', value: '5', icon: TrendingUpIcon, color: 'text-green-400' },
        { title: 'Pending Requests', value: '1', icon: ClockIcon, color: 'text-yellow-400' },
        { title: 'Last Visit', value: '2 days ago', icon: CalendarIcon, color: 'text-purple-400' },
      ];
    }

    return [];
  };

  const getQuickActions = () => {
    if (user?.role === 'admin') {
      return [
        { 
          title: 'Add New Guard', 
          description: 'Register a new security guard',
          icon: ShieldIcon,
          action: () => onViewChange('guards'),
          color: 'bg-blue-500 hover:bg-blue-600'
        },
        { 
          title: 'Add New Resident', 
          description: 'Register a new resident',
          icon: UserPlusIcon,
          action: () => onViewChange('residents'),
          color: 'bg-green-500 hover:bg-green-600'
        },
        { 
          title: 'View System Reports', 
          description: 'Access detailed analytics',
          icon: FileTextIcon,
          action: () => onViewChange('history'),
          color: 'bg-purple-500 hover:bg-purple-600'
        },
        { 
          title: 'Security Overview', 
          description: 'Monitor security status',
          icon: AlertTriangleIcon,
          action: () => onViewChange('history'),
          color: 'bg-red-500 hover:bg-red-600'
        }
      ];
    }

    if (user?.role === 'guard') {
      return [
        { 
          title: 'Scan QR Code', 
          description: 'Verify visitor QR code',
          icon: QrCodeIcon,
          action: () => onViewChange('scan-code'),
          color: 'bg-blue-500 hover:bg-blue-600'
        },
        { 
          title: 'Verify OTP', 
          description: 'Enter visitor OTP code',
          icon: UserCheckIcon,
          action: () => onViewChange('verify-otp'),
          color: 'bg-green-500 hover:bg-green-600'
        },
        { 
          title: 'Emergency Alert', 
          description: 'Report security incident',
          icon: AlertTriangleIcon,
          action: () => alert('Emergency alert triggered! Security team notified.'),
          color: 'bg-red-500 hover:bg-red-600'
        },
        { 
          title: 'Shift Report', 
          description: 'Submit shift summary',
          icon: FileTextIcon,
          action: () => alert('Shift report feature coming soon!'),
          color: 'bg-purple-500 hover:bg-purple-600'
        }
      ];
    }

    if (user?.role === 'resident') {
      return [
        { 
          title: 'Invite Visitor', 
          description: 'Send visitor invitation',
          icon: UserPlusIcon,
          action: () => onViewChange('invite-visitor'),
          color: 'bg-blue-500 hover:bg-blue-600'
        },
        { 
          title: 'View My Invites', 
          description: 'Manage visitor invitations',
          icon: UsersIcon,
          action: () => onViewChange('my-invites'),
          color: 'bg-green-500 hover:bg-green-600'
        },
        { 
          title: 'Quick Invite', 
          description: 'Fast visitor registration',
          icon: PlusIcon,
          action: () => onViewChange('invite-visitor'),
          color: 'bg-purple-500 hover:bg-purple-600'
        },
        { 
          title: 'Contact Security', 
          description: 'Reach security team',
          icon: ShieldIcon,
          action: () => alert('Security contacted! They will respond shortly.'),
          color: 'bg-orange-500 hover:bg-orange-600'
        }
      ];
    }

    return [];
  };

  const stats = getDashboardStats();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
        <h2 className="text-xl lg:text-2xl font-bold text-[#e8eaed] font-['Koulen',Helvetica]">
          Welcome back, {user?.name}
        </h2>
        <div className="text-sm text-[#948979]">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-[#393e46] border-[#948979] hover:bg-[#4a5058] transition-colors cursor-pointer">
              <CardContent className="p-3 lg:p-6">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 lg:gap-0">
                  <div className="text-center lg:text-left">
                    <p className="text-xs lg:text-sm text-[#948979] mb-1">{stat.title}</p>
                    <p className={`text-lg lg:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <IconComponent className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader>
            <h3 className="text-base lg:text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
              Recent Activity
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '10:30 AM', action: 'Visitor John Doe checked in', type: 'success' },
                { time: '09:45 AM', action: 'Guard shift change completed', type: 'info' },
                { time: '09:15 AM', action: 'Security alert resolved', type: 'warning' },
                { time: '08:30 AM', action: 'New resident registered', type: 'success' },
                { time: '08:00 AM', action: 'System backup completed', type: 'info' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded bg-[#2a2f36] hover:bg-[#34393f] transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-[#e8eaed] truncate">{activity.action}</p>
                    <p className="text-xs text-[#948979]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader>
            <h3 className="text-base lg:text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
              Quick Actions
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-3 lg:p-4 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${action.color} text-white shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm">{action.title}</h4>
                        <p className="text-xs opacity-90 truncate">{action.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific insights */}
      {user?.role === 'admin' && (
        <Card className="bg-[#393e46] border-[#948979]">
          <CardHeader>
            <h3 className="text-base lg:text-lg font-semibold text-[#e8eaed] font-['Koulen',Helvetica]">
              System Overview
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#2a2f36] rounded-lg">
                <div className="text-xl lg:text-2xl font-bold text-blue-400">15</div>
                <div className="text-sm text-[#e8eaed]">Total Guards</div>
              </div>
              <div className="text-center p-4 bg-[#2a2f36] rounded-lg">
                <div className="text-xl lg:text-2xl font-bold text-green-400">142</div>
                <div className="text-sm text-[#e8eaed]">Total Residents</div>
              </div>
              <div className="text-center p-4 bg-[#2a2f36] rounded-lg">
                <div className="text-xl lg:text-2xl font-bold text-purple-400">98.5%</div>
                <div className="text-sm text-[#e8eaed]">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};