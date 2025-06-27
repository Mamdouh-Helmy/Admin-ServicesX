import React, { useState, useEffect } from 'react';
import {
  Package,
  Code,
  Users,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  UserCheck,
  Settings,
  Shield,
  RefreshCw,
  Activity,
  Plus,
  Calendar,
  HardHat,
  ShoppingCart,
  ArrowUp,
  Zap,
  Award,
  Target,
  BarChart3,
  PieChart,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import apiService from '../../services/api';

const StatCard = ({ icon: Icon, title, value, color, trend, loading, description, percentage }) => {
  return (
    <div className="group relative bg-white rounded-md md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>

      <div className="relative p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-2 md:p-4 lg:p-5 rounded-md md:rounded-2xl ${color} shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          {trend && !loading && (
            <div className="flex items-center space-x-1 space-x-reverse">
              <ArrowUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {percentage}%
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="text-gray-500 text-sm lg:text-base font-medium">{title}</div>
          {loading ? (
            <div className="w-20 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          ) : (
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {value}
            </div>
          )}
          {description && (
            <div className="text-xs lg:text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full inline-block">
              {description}
            </div>
          )}
        </div>

        {trend && !loading && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">هذا الشهر</span>
              <span className="text-sm font-semibold text-gray-700">{trend}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityItem = ({ icon: Icon, title, time, color, type, details }) => {
  return (
    <div className="group flex flex-col items-center p-4 lg:p-5 bg-gradient-to-r from-white to-gray-50/50 rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-1">
      <div className={`w-12 mb-2 md-mb-0 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg group-hover:scale-110 transition-transform duration-300 ml-4`}>
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-900 font-semibold text-sm lg:text-base group-hover:text-blue-700 transition-colors truncate">{title}</div>
        {details && (
          <div className="text-sm text-gray-600 mt-1 line-clamp-1">{details}</div>
        )}
        <div className="flex items-center mt-2 space-x-2 space-x-reverse">
          <div className="text-gray-500 text-xs lg:text-sm">{time}</div>
          {type && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              {type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Shield className="w-6 h-6 text-red-500" />;
      case 'technical':
        return <HardHat className="w-6 h-6 text-blue-500" />;
      case 'customer':
        return <UserCheck className="w-6 h-6 text-green-500" />;
      default:
        return <Users className="w-6 h-6 text-gray-500" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'technical':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'customer':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getRoleName = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'مدير النظام';
      case 'technical':
        return 'فني';
      case 'customer':
        return 'عميل';
      default:
        return role || 'مستخدم';
    }
  };

  return (
    <div className="bg-white rounded-md md:rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <h2 className="text-[16px] md:text-xl lg:text-2xl font-bold text-gray-900">معلومات المستخدم</h2>
          </div>
          <div className={`w-8 h-8 md:w-16 md:h-16 lg:w-18 lg:h-18 ${getRoleColor(user?.role)} rounded-md md:rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300`}>
            <span className="text-white font-bold text-lg lg:text-xl">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="text-[16px] font-semibold text-gray-500">الاسم الكامل</div>
            <div className="text-gray-900 block w-full font-bold text-[16px] lg:text-base">
              {user?.firstName} {user?.lastName}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="text-[16px] font-semibold text-gray-500">البريد الإلكتروني</div>
            <div dir='ltr' className="text-gray-900 block text-left text-sm lg:text-base truncate w-full">{user?.email}</div>
          </div>

          {user?.phone && (
            <div className="flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="text-sm font-semibold text-gray-500">رقم الهاتف</div>
              <div className="text-gray-900 text-sm lg:text-base">{user?.phone}</div>
            </div>
          )}

          {user?.address && (
            <div className="flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="text-sm font-semibold text-gray-500">العنوان</div>
              <div className="text-gray-900 text-sm lg:text-base">{user?.address}</div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center space-x-3 space-x-reverse">
              {getRoleIcon(user?.role)}
              <div className="text-sm font-semibold text-blue-700">الدور</div>
            </div>
            <div className="text-blue-800 font-bold text-sm lg:text-base">{getRoleName(user?.role)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    services: 0,
    codes: 0,
    adminUsers: 0,
    customerUsers: 0,
    technicalUsers: 0,
    orders: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      const dashboardStats = await apiService.getUsers();

      const [servicesData, codesData] = await Promise.all([
        apiService.getServices(),
        apiService.getCodes()
      ]);

      setStats({
        services: dashboardStats.servicesCount || servicesData.length || 0,
        codes: codesData.length || 0,
        adminUsers: dashboardStats.adminsCount || (user?.role === 'admin' ? 1 : 0),
        customerUsers: dashboardStats.usersCount || 0,
        technicalUsers: dashboardStats.techniciansCount || 0,
        orders: dashboardStats.orders || 0
      });

      const localActivities = apiService.getLocalActivities();
      const formattedActivities = localActivities.map(activity => ({
        id: activity.id,
        type: activity.type,
        title: activity.title,
        details: activity.details,
        time: activity.timeAgo,
        icon: getActivityIcon(activity.type),
        color: getActivityColor(activity.type)
      }));

      setActivities(formattedActivities.slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      'service': Package,
      'code': Code,
      'user': Users,
      'order': ShoppingCart,
      'system': Activity,
      'default': Clock
    };
    return icons[type] || icons['default'];
  };

  const getActivityColor = (type) => {
    const colors = {
      'service': 'bg-gradient-to-r from-green-500 to-emerald-600',
      'code': 'bg-gradient-to-r from-blue-500 to-indigo-600',
      'user': 'bg-gradient-to-r from-purple-500 to-violet-600',
      'order': 'bg-gradient-to-r from-amber-500 to-orange-600',
      'system': 'bg-gradient-to-r from-indigo-500 to-purple-600',
      'default': 'bg-gradient-to-r from-gray-500 to-gray-600'
    };
    return colors[type] || colors['default'];
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="space-y-6 lg:space-y-8 md:p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-md md:rounded-3xl lg:rounded-4xl p-6 lg:p-10 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 lg:w-60 lg:h-60 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-16 -translate-x-16 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <span className="text-2xl lg:text-3xl font-bold">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-[18px] md:text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                    مرحباً، {user?.firstName} {user?.lastName}
                  </h1>
                  <div className="text-blue-100 text-[15px] md:text-lg lg:text-xl font-medium">
                    {user?.role === 'Admin' ? 'لوحة تحكم المدير' : 'لوحة التحكم الخاصة بك'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                <div className="flex items-center space-x-2 space-x-reverse bg-white/10 px-4 py-2 lg:px-5 lg:py-3 rounded-md md:rounded-full backdrop-blur-sm border border-white/20">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm lg:text-base font-medium">
                    {user?.role === 'Admin' ? 'مدير النظام' : user?.role === 'Technical' ? 'فني' : 'عميل'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse bg-white/10 px-4 py-2 lg:px-5 lg:py-3 rounded-md md:rounded-full backdrop-blur-sm border border-white/20">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm lg:text-base font-medium">متصل</span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1 md:space-x-2 space-x-reverse bg-white/10 hover:bg-white/20 px-4 py-2 lg:px-5 lg:py-3 rounded-md md:rounded-full backdrop-blur-sm transition-all duration-200 border border-white/20 hover:border-white/30"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="text-[14px] lg:text-base font-medium">
                    {refreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/20">
                <Target className="w-6 h-6 lg:w-10 lg:h-10 text-yellow-300 mx-auto mb-2" />
                <div className="text-sm font-medium block text-blue-100">الخدمات النشطة</div>
                <div className="text-xl lg:text-3xl font-bold">{stats.services}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/20">
                <Award className="w-6 h-6 lg:w-10 lg:h-10 text-green-300 mx-auto mb-2" />
                <div className="text-sm font-medium block text-blue-100">الأكواد المتاحة</div>
                <div className="text-xl lg:text-3xl font-bold">{stats.codes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={Package}
          title="إجمالي الخدمات"
          value={stats.services}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={`${stats.services} متاحة`}
          loading={loading}
          description="الخدمات المتاحة حالياً"
          percentage="12"
        />
        <StatCard
          icon={Code}
          title="الأكواد المتاحة"
          value={stats.codes}
          color="bg-gradient-to-r from-green-500 to-emerald-600"
          trend={`${stats.codes} نشط`}
          loading={loading}
          description="أكواد الشحن النشطة"
          percentage="8"
        />
        {/* <StatCard
          icon={Shield}
          title="المديرين"
          value={stats.adminUsers}
          color="bg-gradient-to-r from-red-500 to-red-600"
          loading={loading}
          description="مديري النظام"
          percentage="5"
        /> */}
        <StatCard
          icon={UserCheck}
          title="العملاء"
          value={stats.customerUsers}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          loading={loading}
          description="العملاء المسجلين"
          percentage="25"
        />
        <StatCard
          icon={HardHat}
          title="الفنيين"
          value={stats.technicalUsers}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          loading={loading}
          description="الفنيين المتاحين"
          percentage="15"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <UserCard user={user} />

        <div className="bg-white rounded-md md:rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

          <div className="relative">
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between mb-8">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 md;w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md md:rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-[15px] md:text-xl lg:text-2xl font-bold text-gray-900">النشاط الأخير</h2>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-3 h-3 md:w-5 md:h-5 text-gray-400" />
                <div className="text-[14px] text-gray-500 font-medium">آخر تحديث</div>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center p-4 lg:p-5 bg-gray-50 rounded-2xl animate-pulse">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-2xl ml-4"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))
              ) : activities.length > 0 ? (
                activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    icon={activity.icon}
                    title={activity.title}
                    details={activity.details}
                    time={activity.time}
                    color={activity.color}
                    type={activity.type}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد أنشطة حديثة</h3>
                  <div className="text-gray-500">ستظهر الأنشطة الجديدة هنا عند حدوثها</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md md:rounded-3xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 md:w-40 md:h-40 bg-gradient-to-bl from-amber-50 to-transparent rounded-full transform translate-x-14 -translate-y-14 md:translate-x-20 md:-translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tr from-blue-50 to-transparent rounded-full transform -translate-x-10 translate-y-10 md:-translate-x-16 md:translate-y-16"></div>

        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 lg:mb-8 gap-3 md:gap-4">
            <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">ملخص الإحصائيات</h2>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 md:px-4 md:py-2 rounded-full border border-blue-200">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <div className="text-xs md:text-sm font-semibold text-blue-700">نمو مستمر</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="group text-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl md:rounded-3xl border border-amber-200 hover:border-amber-300 hover:shadow-md md:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md md:shadow-lg group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-amber-900 mb-1 md:mb-2">إجمالي الطلبات</h3>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-700 mb-2 md:mb-3">
                {loading ? (
                  <div className="inline-block w-16 h-8 md:w-20 md:h-10 bg-amber-200 rounded-lg animate-pulse"></div>
                ) : (
                  stats.orders
                )}
              </div>
              <div className="text-xs md:text-sm text-amber-600 bg-amber-100 px-2 py-1 md:px-4 md:py-2 rounded-full inline-block font-medium">
                جميع الطلبات المسجلة
              </div>
            </div>

            <div className="group text-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-md md:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md md:shadow-lg group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300">
                <Package className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-green-900 mb-1 md:mb-2">الخدمات النشطة</h3>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 md:mb-3">
                {stats.services}
              </div>
              <div className="text-xs md:text-sm text-green-600 bg-green-100 px-2 py-1 md:px-4 md:py-2 rounded-full inline-block font-medium">
                الخدمات المتاحة حالياً
              </div>
            </div>

            <div className="group text-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl md:rounded-3xl border border-blue-200 hover:border-blue-300 hover:shadow-md md:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md md:shadow-lg group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-blue-900 mb-1 md:mb-2">إجمالي المستخدمين</h3>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 mb-2 md:mb-3">
                {stats.adminUsers + stats.customerUsers + stats.technicalUsers}
              </div>
              <div className="text-xs md:text-sm text-blue-600 bg-blue-100 px-2 py-1 md:px-4 md:py-2 rounded-full inline-block font-medium">
                جميع أنواع المستخدمين
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;