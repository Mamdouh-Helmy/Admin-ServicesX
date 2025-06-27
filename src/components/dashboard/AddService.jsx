import React, { useState } from 'react';
import { Upload, Plus, X, Image, FileText } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';

const AddService = () => {
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [serviceCover, setServiceCover] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const { formData, errors, handleChange, validateAll, clearErrors, setFormData } = useFormValidation({
    name: '',
    description: '',
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) {
      setServiceCover(null);
      setPreviewImages([]);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      showError('يرجى اختيار ملفات صور صالحة فقط (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file sizes (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      showError('حجم الملف يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    setServiceCover(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
    
    // Clear any existing cover error
    if (errors.cover) {
      clearErrors();
    }
  };

  const removeImage = (index) => {
    if (serviceCover) {
      const newFiles = Array.from(serviceCover).filter((_, i) => i !== index);
      const newPreviews = previewImages.filter((_, i) => i !== index);
      
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(previewImages[index]);
      
      if (newFiles.length === 0) {
        setServiceCover(null);
        setPreviewImages([]);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        // Create new FileList
        const dt = new DataTransfer();
        newFiles.forEach(file => dt.items.add(file));
        setServiceCover(dt.files);
        setPreviewImages(newPreviews);
      }
    }
  };

  const resetForm = () => {
    // Clear form data
    setFormData({
      name: '',
      description: '',
    });
    
    // Clear files and previews
    setServiceCover(null);
    previewImages.forEach(url => URL.revokeObjectURL(url));
    setPreviewImages([]);
    
    // Clear errors
    clearErrors();
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form including files
    if (!validateAll(serviceCover)) {
      showError('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    // Additional validation for files
    if (!serviceCover || serviceCover.length === 0) {
      showError('يرجى اختيار صورة واحدة على الأقل للخدمة');
      return;
    }

    setLoading(true);
    try {
      const serviceData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        cover: serviceCover,
      };

      await apiService.createService(serviceData);
      showSuccess(`تم إضافة الخدمة "${formData.name}" بنجاح`);
      
      // Reset form after successful submission
      resetForm();
      
    } catch (error) {
      console.error('Error creating service:', error);
      showError(error.message || 'حدث خطأ أثناء إضافة الخدمة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 text-white">
        <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
          <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm">
            <Plus className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">إضافة خدمة جديدة</h1>
            <p className="text-blue-100 text-sm md:text-base">أضف خدمة جديدة إلى النظام بسهولة وسرعة</p>
          </div>
        </div>
      </div>

      {/* Add Service Form */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
          {/* Service Basic Info */}
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse mb-3 md:mb-4">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h3 className="text-base md:text-lg font-semibold text-gray-900">المعلومات الأساسية</h3>
              </div>
              
              {/* Service Name */}
              <Input
                label="اسم الخدمة"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="أدخل اسم الخدمة بوضوح"
                required
                className="text-base md:text-lg"
              />
            </div>

            {/* Service Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                وصف الخدمة <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="أدخل وصفاً مفصلاً وجذاباً للخدمة يساعد العملاء على فهم ما تقدمه..."
                className={`
                  w-full px-3 py-2 md:px-4 md:py-3 border rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  transition-all duration-200 resize-none text-sm md:text-base
                  ${errors.description ? 'border-red-500' : 'border-gray-300'}
                `}
              />
              {errors.description && (
                <p className="text-xs md:text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Service Images */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-3 md:mb-4">
              <Image className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">صور الخدمة</h3>
            </div>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200">
              <div className="space-y-3 md:space-y-4">
                <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 text-base md:text-lg font-medium mb-1 md:mb-2">اختر صور الخدمة أو اسحبها هنا</p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">PNG, JPG, GIF, WEBP حتى 5MB لكل صورة</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="service-cover"
                />
                <label
                  htmlFor="service-cover"
                  className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-200 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl text-sm md:text-base"
                >
                  <Upload className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                  اختيار الملفات
                </label>
              </div>
            </div>

            {/* Preview Images */}
            {previewImages.length > 0 && (
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <p className="text-xs md:text-sm font-semibold text-gray-700">
                    الصور المختارة ({previewImages.length})
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3 lg:gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 md:h-24 object-cover rounded-lg md:rounded-xl border-2 border-gray-200 group-hover:border-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -left-1 md:-top-2 md:-left-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 md:p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md md:shadow-lg"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.cover && (
              <p className="text-xs md:text-sm text-red-500">{errors.cover}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 md:sm:space-x-4 sm:space-x-reverse pt-4 md:pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={loading}
              className="w-full sm:w-auto px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              loading={loading}
              icon={Plus}
              disabled={!formData.name || !formData.description || !serviceCover}
              className="w-full sm:w-auto px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              إضافة الخدمة
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;