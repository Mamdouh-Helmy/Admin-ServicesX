import React from 'react';
import { Bell, Search, Menu, Sun, Moon, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const { user } = useAuth();
  return (
    <header className="bg-white/80 backdrop-blur-md w-full shadow-sm border-b border-gray-200/60 sticky left-0 top-0 z-30">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={onToggleSidebar}
              className="p-1 md:p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200 lg:hover:scale-105"
            >
              {sidebarOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-3 space-x-reverse bg-gray-50 rounded-xl p-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'Admin' ? 'مدير النظام' : 
                   user?.role === 'Technician' ? 'فني' : 'عميل'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;