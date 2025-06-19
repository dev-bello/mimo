import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { LogOutIcon, UserIcon, BellIcon, SettingsIcon } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "from-red-500 to-red-600";
      case "guard":
        return "from-blue-500 to-blue-600";
      case "resident":
        return "from-green-500 to-green-600";
      default:
        return "from-neutral-500 to-neutral-600";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "guard":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "resident":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <header className="glass-effect rounded-2xl p-6 mb-6 shadow-soft border-0">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-4xl font-bold font-display gradient-text mb-2">
            MiMo NG
          </h1>
          <p className="text-neutral-600 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3 flex-1 lg:flex-none">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(
                  user.role
                )} rounded-2xl flex items-center justify-center shadow-soft`}
              >
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 lg:flex-none">
                <div className="font-semibold text-neutral-800 text-lg">
                  {user.name}
                </div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="button-secondary p-3 rounded-xl"
              >
                <BellIcon className="w-4 h-4" />
              </Button>

              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="button-secondary px-4 py-3 rounded-xl font-medium"
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
