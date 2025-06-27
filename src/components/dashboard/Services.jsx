import React, { useState, useEffect } from 'react';
import { Package, Edit, Trash2, Eye, Search, Filter, Grid, List as ListIcon, Star, Heart, Share2, MoreVertical, Zap, Sparkles, TrendingUp } from 'lucide-react';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';

const ServiceCard = ({ service }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group bg-white rounded-sm md:rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 md:hover:-translate-y-2 relative">
      {/* Service Image */}
      <div className="relative h-50 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 overflow-hidden">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center" 
          style={{ display: service.imageUrl ? 'none' : 'flex' }}
        >
          <Package className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white opacity-80" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200">
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold shadow-md">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
            <span>متاح</span>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center space-x-1 space-x-reverse bg-yellow-500/90 backdrop-blur-sm text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold shadow-md">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            <span>4.8</span>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-4 md:p-5 lg:p-6 xl:p-7">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 mb-1 md:mb-2">
              {service.name}
            </h3>
            <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse mb-2 md:mb-3">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                <span className="text-xs md:text-sm font-medium text-gray-600">خدمة مميزة</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span className="text-[10px] md:text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                #{service.id}
              </span>
            </div>
          </div>
{/*           
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <MoreVertical className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
            
            {showMenu && (
              <div className="absolute top-8 md:top-10 left-0 bg-white rounded-lg md:rounded-xl shadow-lg border border-gray-100 py-1 md:py-2 z-10 min-w-28 md:min-w-32">
                <button className="w-full px-3 py-1.5 md:px-4 md:py-2 text-right text-xs md:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  تعديل
                </button>
                <button className="w-full px-3 py-1.5 md:px-4 md:py-2 text-right text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors">
                  حذف
                </button>
              </div>
            )}
          </div> */}
        </div>
        
        <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed mb-4 md:mb-5 lg:mb-6 line-clamp-3 min-h-[3.5rem] md:min-h-[4.5rem]">
          {service.description}
        </p>

        {/* Service Stats */}
        {/* <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6 p-2 md:p-3 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl md:rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 space-x-reverse text-xs md:text-sm">
            <div className="flex items-center space-x-1 space-x-reverse text-green-600">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-semibold">نشط</span>
            </div>
            <div className="w-1 h-3 md:h-4 bg-gray-300 rounded-full"></div>
            <div className="text-gray-500">
              <span className="font-medium">المشاهدات: </span>
              <span className="font-bold text-gray-700">1.2k</span>
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
          <Button 
            size="xs" 
            variant="primary" 
            icon={Eye} 
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-xs md:text-sm"
          >
            عرض التفاصيل
          </Button>
          <Button 
            size="xs" 
            variant="outline" 
            icon={Edit}
            className="px-2 md:px-3 lg:px-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-xs md:text-sm"
          >
            <span className="hidden sm:inline">تعديل</span>
          </Button>
          <Button 
            size="xs" 
            variant="danger" 
            icon={Trash2}
            className="px-2 md:px-3 lg:px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-200 text-xs md:text-sm"
          >
            <span className="hidden sm:inline">حذف</span>
          </Button>
        </div> */}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl md:rounded-3xl"></div>
    </div>
  );
};

const Services = () => {
  const { showError } = useNotification();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServices();
      setServices(response);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 md:h-80 lg:h-96">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base font-medium">جاري تحميل الخدمات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 md:p-3 md:p-4 lg:p-6">
      {/* Enhanced Page Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 xl:p-10 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-28 h-28 md:w-40 md:h-40 lg:w-60 lg:h-60 bg-white/10 rounded-full -translate-y-14 md:-translate-y-20 translate-x-14 md:translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-10 md:translate-y-16 -translate-x-10 md:-translate-x-16"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-lg md:blur-xl animate-pulse"></div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-lg md:shadow-xl">
                <Package className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-[17px] md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text">
                  الخدمات المتاحة
                </h1>
                <p className="text-purple-100 text-[14px] md:text-base lg:text-lg font-medium">
                  إدارة وعرض جميع الخدمات المتاحة في النظام
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 md:space-x-4 space-x-reverse">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 xl:p-6 text-center border border-white/20">
                <Zap className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-yellow-300 mx-auto mb-1 md:mb-2" />
                <span className="text-xs md:text-sm font-medium block text-purple-100">إجمالي الخدمات</span>
                <div className="text-lg md:text-xl lg:text-xl xl:text-xl font-bold">{services.length}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-purple-200" />
              <input
                type="text"
                placeholder="البحث في الخدمات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 md:pr-12 pl-4 md:pl-5 lg:pl-6 py-2 md:py-3 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl md:rounded-2xl placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-sm md:text-base lg:text-lg"
              />
            </div>
            
            {/* View Mode Toggle */}
            {/* <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm p-1 md:p-2 rounded-xl md:rounded-2xl border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-purple-600 shadow-md md:shadow-lg' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Grid className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-purple-600 shadow-md md:shadow-lg' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <ListIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </button>
            </div> */}
            
            {/* <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-1 md:space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 md:px-4 lg:px-5 xl:px-6 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-200 text-sm md:text-base"
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              <span className="text-white font-medium hidden sm:inline">فلترة</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Services Content */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-8 lg:p-10 xl:p-12 text-center border border-gray-100 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-full transform translate-x-12 md:translate-x-16 -translate-y-12 md:-translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-blue-50 to-transparent rounded-full transform -translate-x-10 md:-translate-x-12 translate-y-10 md:translate-y-12"></div>
          
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 lg:mb-8 shadow-md md:shadow-lg">
              <Package className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-400" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">
              {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد خدمات متاحة'}
            </h3>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-md mx-auto leading-relaxed">
              {searchTerm 
                ? 'لم يتم العثور على خدمات تطابق كلمات البحث المطلوبة. جرب كلمات مختلفة.' 
                : 'لم يتم إضافة أي خدمات بعد. ابدأ بإضافة خدمة جديدة لعرضها هنا.'
              }
            </p>
            {!searchTerm && (
              <div className="mt-4 md:mt-6 lg:mt-8">
                <Button 
                  variant="primary" 
                  icon={Plus}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-200 text-sm md:text-base"
                >
                  إضافة خدمة جديدة
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-5 lg:p-6 xl:p-7 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                قائمة الخدمات ({filteredServices.length})
              </h2>
              <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse text-xs md:text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">جميع الخدمات نشطة</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className=" md:p-5 lg:p-6 xl:p-7 xl:p-8">
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 xl:gap-7' 
                : 'space-y-4 md:space-y-5 lg:space-y-6'
              }
            `}>
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;