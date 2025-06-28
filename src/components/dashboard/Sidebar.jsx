import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Settings,
  Package,
  Plus,
  List,
  Code,
  LogOut,
  ChevronLeft,
  X,
  Activity,
  Zap,
  FileText,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showSuccess } = useNotification();

  const menuItems = [
    { icon: Home, label: 'الرئيسية', path: '/dashboard', color: 'text-blue-600' },
    { icon: Plus, label: 'إضافة خدمة', path: '/dashboard/add-service', color: 'text-green-600' },
    { icon: List, label: 'عرض الخدمات', path: '/dashboard/services', color: 'text-purple-600' },
    { icon: Code, label: 'إنشاء كود', path: '/dashboard/create-code', color: 'text-orange-600' },
    { icon: Package, label: 'عرض الأكواد', path: '/dashboard/codes', color: 'text-teal-600' },
    { icon: FileText, label: 'سياسة الاستخدام', path: '/dashboard/privacy-policy', color: 'text-indigo-600' },
    { icon: HelpCircle, label: 'الأسئلة الشائعة', path: '/dashboard/faq', color: 'text-emerald-600' },
    { icon: Headphones, label: 'الدعم الفني', path: '/dashboard/support', color: 'text-cyan-600' },
  ];

  const handleLogout = () => {
    logout();
    showSuccess('تم تسجيل الخروج بنجاح');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 right-0 h-screen bg-white shadow-2xl transition-all duration-300 z-50
          border-l border-gray-200 flex flex-col
          ${isMobile ? (isOpen ? 'w-full' : 'hidden') : (isOpen ? 'w-64 md:w-72' : 'w-20')}
        `}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-lg md:text-xl font-bold">سيرفيس إكس</h1>
                  <p className="text-blue-100 text-xs md:text-sm">لوحة التحكم</p>
                </div>
              </div>
            )}

            {!isOpen && !isMobile ? (
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm mx-auto">
                <Zap className="w-5 h-5 text-white" />
              </div>
            ) : (
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-center space-x-3 space-x-reverse">
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg m-auto">
                <span className="text-white font-bold text-sm md:text-lg">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm md:text-base truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-500 text-xs md:text-sm truncate">
                  {user?.role === 'Admin' ? 'مدير النظام' :
                    user?.role === 'Technician' ? 'فني' : 'عميل'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-3 md:p-4 space-y-1 md:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group flex items-center w-full space-x-3 space-x-reverse p-2 md:p-3 rounded-lg md:rounded-xl
                    transition-all duration-200 relative overflow-hidden
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                  onClick={isMobile ? onClose : undefined}
                >
                  <div className={`
                    p-1.5 md:p-2 rounded-md md:rounded-lg transition-colors 
                    ${isActive ? 'bg-white/20' : 'group-hover:bg-gray-100'}
                  `}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  </div>

                  {isOpen && (
                    <span className={`font-medium text-sm md:text-base transition-colors ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {item.label}
                    </span>
                  )}

                  {!isOpen && (
                    <div className="absolute right-14 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Buttons */}
        <div className="p-3 md:p-4 border-t border-gray-100 space-y-1 md:space-y-2 flex-shrink-0">
          <button
            className={`
              group flex items-center space-x-3 space-x-reverse p-2 md:p-3 rounded-lg md:rounded-xl
              text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full
              transition-all duration-200 relative
            `}
          >
            <div className="p-1.5 md:p-2 rounded-md md:rounded-lg group-hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            </div>
            {isOpen && <span className="font-medium text-sm md:text-base">الإعدادات</span>}
            {!isOpen && (
              <div className="absolute right-14 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                الإعدادات
              </div>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={`
              group flex items-center space-x-3 space-x-reverse p-2 md:p-3 rounded-lg md:rounded-xl
              text-red-600 hover:bg-red-50 hover:text-red-700 w-full
              transition-all duration-200 relative
            `}
          >
            <div className="p-1.5 md:p-2 rounded-md md:rounded-lg group-hover:bg-red-100 transition-colors">
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            {isOpen && <span className="font-medium text-sm md:text-base">تسجيل الخروج</span>}
            {!isOpen && (
              <div className="absolute right-14 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                تسجيل الخروج
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;