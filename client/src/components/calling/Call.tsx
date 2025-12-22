import { useState } from "react";
import { Users, PhoneCall, TrendingUp, History, MessageCircle, FileHeart, User as UserIcon, Menu, X, Sun, Moon, Monitor, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoCallSection from "./Random-call";
import LiveRoomsSection from "./Live-room";
import ProgressSection from "./Progress";
import ProfileSection from "./Profile";
import HistorySection from "./Call-history";
import FavoritePracticePartner from "./Favorite-partner";
import ChatWithStrangers from "./Chat-with-stranger";

const Call = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"call" | "rooms" | "progress" | "history" | "favorites" | "chat" | "profile">("call");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const navItems = [
    { id: "call" as const, label: "Talk with Strangers", icon: PhoneCall },
    { id: "chat" as const, label: "Chat with Strangers", icon: MessageCircle },
    { id: "rooms" as const, label: "Live Rooms", icon: Users },
    { id: "progress" as const, label: "Progress", icon: TrendingUp },
    { id: "history" as const, label: "Call History", icon: History },
    { id: "favorites" as const, label: "Favorite Partner", icon: FileHeart },
    { id: "profile" as const, label: "Profile", icon: UserIcon },
  ];

  const themeOptions = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const accessToken = localStorage.getItem("access_token");
      
      // Call logout API
      await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear tokens regardless of API response
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      
      // Redirect to home page
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header Area with Close Button */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">
              Daily<span className="text-rose-500">Talk</span>
            </h1>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon 
                      size={20} 
                      className={`transition-transform group-hover:scale-110 ${
                        isActive ? '' : 'text-gray-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer group bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg hover:from-red-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut 
                size={20} 
                className="transition-transform group-hover:scale-110"
              />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>

          {/* Theme Toggle Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Theme</p>
              <div className="flex gap-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = theme === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={option.label}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Copyright Text */}
            <div className="text-center pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © 2025 <span className="font-semibold text-indigo-600">Daily<span className="text-rose-500">Talk</span></span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-20 p-2 rounded-lg bg-white shadow-lg lg:hidden hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Menu size={24} className="text-gray-600" />
        </button>

        {/* Render Active Section */}
        {activeTab === "call" && <VideoCallSection />}
        {activeTab === "rooms" && <LiveRoomsSection />}
        {activeTab === "progress" && <ProgressSection />}
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "history" && <HistorySection />}
        {activeTab === "favorites" && <FavoritePracticePartner />}
        {activeTab === "chat" && <ChatWithStrangers />}
      </div>
    </div>
  );
};

export default Call;