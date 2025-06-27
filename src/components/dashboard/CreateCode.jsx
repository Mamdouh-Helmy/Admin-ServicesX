import React, { useState } from 'react';
import { Plus, Code, Zap, Copy, CheckCircle } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';

const CreateCode = () => {
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);

  const handleCreateCode = async () => {
    setLoading(true);
    try {
      const response = await apiService.createCode();
      setGeneratedCode(response);
      showSuccess(`تم إنشاء الكود "${response.code || 'جديد'}" بنجاح`);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showSuccess('تم نسخ الكود إلى الحافظة');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 text-white">
        <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
          <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm">
            <Plus className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[19px] md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">إنشاء كود شحن جديد</h1>
            <p className="text-green-100 text-sm md:text-base">أنشئ كود شحن فريد وآمن للعملاء</p>
          </div>
        </div>
      </div>

      {/* Create Code Section */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-4 md:space-y-8">
            {/* Icon */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto shadow-xl md:shadow-2xl">
                <Code className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-yellow-400 rounded-full p-1 md:p-2">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-800" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                إنشاء كود شحن فريد
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-lg mx-auto leading-relaxed">
                اضغط على الزر أدناه لإنشاء كود شحن فريد وآمن يمكن للعملاء استخدامه في عمليات الشحن
              </p>
            </div>

            {/* Create Button */}
            <div className="pt-2 md:pt-4">
              <Button
                onClick={handleCreateCode}
                loading={loading}
                icon={Plus}
                size="md" // Changed from lg to md for mobile
                className="px-6 md:px-8 lg:px-12 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg md:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {loading ? 'جاري الإنشاء...' : 'إنشاء كود جديد'}
              </Button>
            </div>

            {/* Generated Code Display */}
            {generatedCode && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 mt-6 md:mt-12 border border-green-200 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-center mb-3 md:mb-6">
                  <div className="bg-green-500 rounded-full p-2 md:p-3">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-6">
                  تم إنشاء الكود بنجاح!
                </h3>
                
                <div className="bg-white border-2 border-dashed border-green-300 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 shadow-inner">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4">
                    <div className="text-center sm:text-right flex-1">
                      <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 font-medium">رقم الكود الجديد</p>
                      <p className="text-[14px] md:text-2xl lg:text-3xl font-mono font-bold text-green-700 tracking-wider">
                        {generatedCode.code}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm" // Changed from lg to sm for mobile
                      icon={Copy}
                      onClick={() => copyToClipboard(generatedCode.code)}
                      className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 text-xs md:text-sm"
                    >
                      نسخ الكود
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-6 p-2 md:p-3 lg:p-4 bg-blue-50 rounded-lg md:rounded-xl border border-blue-200">
                  <p className="text-xs md:text-sm text-blue-800 text-center font-medium">
                    💡 يمكنك الآن مشاركة هذا الكود مع العملاء أو حفظه للاستخدام لاحقاً
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCode;