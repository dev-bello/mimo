import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { VisitorHistorySection } from "./sections/VisitorHistorySection";
import { VisitorTableSection } from "./sections/VisitorTableSection";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { DashboardView } from "../../components/views/DashboardView";
import { GuardManagement } from "../../components/views/admin/GuardManagement";
import { ResidentManagement } from "../../components/views/admin/ResidentManagement";
import { ScanCodeView } from "../../components/views/guard/ScanCodeView";
import { VerifyOTPView } from "../../components/views/guard/VerifyOTPView";
import { InviteVisitorView } from "../../components/views/resident/InviteVisitorView";
import { MyInvitesView } from "../../components/views/resident/MyInvitesView";
import { useAuth } from "../../contexts/AuthContext";
import { MenuIcon, XIcon } from "lucide-react";

export const HistoryFrame = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onViewChange={setActiveView} />;
      
      // Admin Views
      case 'guards':
        return <GuardManagement />;
      case 'residents':
        return <ResidentManagement />;
      case 'history':
        return (
          <Card className="bg-[#393e46] rounded-[7px] border-none">
            <CardContent className="p-3.5">
              <div className="border border-solid border-[#948979] p-3">
                <VisitorHistorySection />
                <VisitorTableSection userRole={user?.role} />
              </div>
            </CardContent>
          </Card>
        );
      
      // Guard Views
      case 'scan-code':
        return <ScanCodeView />;
      case 'verify-otp':
        return <VerifyOTPView />;
      
      // Resident Views
      case 'invite-visitor':
        return <InviteVisitorView />;
      case 'my-invites':
        return <MyInvitesView />;
      
      default:
        return <DashboardView onViewChange={setActiveView} />;
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <div className="bg-[#222831] flex flex-col lg:flex-row justify-center w-full min-h-screen">
      <div className="bg-[#222831] rounded-[20px] overflow-x-hidden w-full max-w-[1487px] relative p-2 lg:p-4">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden flex items-center justify-between mb-4 p-4 bg-[#393e46] rounded-lg">
          <h1 className="text-lg font-bold text-[#dfd0b8] font-['Kumar_One',Helvetica]">
            VMS
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#e8eaed] p-2"
          >
            {sidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>
        
        <div className="flex relative">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`
            lg:relative lg:translate-x-0 lg:block
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:static top-0 left-0 h-full lg:h-auto
            transition-transform duration-300 ease-in-out
            z-50 lg:z-auto
            lg:mr-[47px]
          `}>
            <Sidebar activeView={activeView} onViewChange={handleViewChange} />
          </div>
          
          {/* Main Content */}
          <main className="flex-1 min-w-0 px-2 lg:px-0">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
};