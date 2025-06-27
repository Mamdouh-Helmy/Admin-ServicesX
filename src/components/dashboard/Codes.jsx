import React, { useState, useEffect } from 'react';
import { Code, Copy, Search, Filter, QrCode } from 'lucide-react';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';

const CodeCard = ({ code, index, onCopy }) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-4 md:p-6 group">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse flex-1">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg md:rounded-xl p-2 md:p-3 group-hover:scale-105 transition-transform duration-200">
            <QrCode className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-1">
              <p className="text-xs md:text-sm text-gray-500 font-medium">كود رقم {index + 1}</p>
              {/* <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                #{code.id}
              </span> */}
            </div>
            <p className="font-mono font-bold text-[14px] md:text-xl text-gray-900 mb-1 md:mb-2 tracking-wider">
              {code.code}
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">نشط</span>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          icon={Copy}
          onClick={() => onCopy(code.code)}
          className="hover:bg-green-50 mt-3 md:mt-0 hover:border-green-300 hover:text-green-700 text-[14px] block md:text-sm"
        >
          نسخ
        </Button>
      </div>
    </div>
  );
};

const Codes = () => {
  const { showSuccess, showError } = useNotification();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await apiService.getCodes();
      setCodes(response);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showSuccess('تم نسخ الكود إلى الحافظة');
  };

  const filteredCodes = codes.filter(code =>
    code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.id.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
            <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm">
              <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-[18px] md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">أكواد الشحن</h1>
              <p className="text-purple-100 text-[14px] md:text-base">إدارة وعرض جميع أكواد الشحن المتاحة</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 text-center">
            <span className="text-xs md:text-sm font-medium block text-purple-100">إجمالي الأكواد</span>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">{codes.length}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 md:mt-6">
          <div className="relative">
            <Search className="w-4 h-4 md:w-5 md:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200" />
            <input
              type="text"
              placeholder="البحث في الأكواد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 md:pr-10 pl-3 md:pl-4 py-2 md:py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg md:rounded-xl placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Codes Content */}
      {filteredCodes.length === 0 ? (
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-6 md:p-8 lg:p-12 text-center border border-gray-100">
          <div className="bg-gray-100 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Code className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
            {searchTerm ? 'لا توجد نتائج' : 'لا توجد أكواد'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">
            {searchTerm ? 'لم يتم العثور على أكواد تطابق البحث المطلوب' : 'لم يتم إنشاء أي أكواد شحن بعد. ابدأ بإنشاء كود جديد'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">
                قائمة الأكواد ({filteredCodes.length})
              </h2>
              {/* <Button variant="outline" icon={Filter} size="sm" className="text-xs md:text-sm">
                فلترة
              </Button> */}
            </div>
          </div>
          <div className="p-4 md:p-6 space-y-3 md:space-y-4">
            {filteredCodes.map((code, index) => (
              <CodeCard
                key={code.id}
                code={code}
                index={index}
                onCopy={handleCopyCode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Codes;