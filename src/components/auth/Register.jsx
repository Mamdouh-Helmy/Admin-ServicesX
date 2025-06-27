import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Upload, ArrowRight } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';

const Register = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { formData, errors, handleChange, validateAll } = useFormValidation({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateAll(profilePicture)) return;

  setLoading(true);
  try {
    const registerData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      email: formData.email,
      Phone: formData.phone,
      password: formData.password,
      address: formData.address,
      role: 'Admin',
    };

    // إضافة صورة الملف فقط إذا كانت موجودة
    if (profilePicture) {
      registerData.cover = Array.isArray(profilePicture) ? profilePicture : [profilePicture];
    }

    await apiService.register(registerData);
    showSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');
    navigate('/login');
  } catch (error) {
    showError(error.message || 'حدث خطأ أثناء إنشاء الحساب');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light/20 to-primary/5 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">

          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-4 sm:p-6 text-white text-center">
            <h1 className="text-base sm:text-lg font-bold">سيرفيس إكس</h1>
            <p className="text-xs sm:text-sm mt-1">إنشاء حساب جديد</p>
          </div>

          {/* Profile Picture Upload */}
          <div className="flex justify-center my-4">
            <div className="relative">
              <label className="cursor-pointer">
                {previewImage ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={previewImage} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
          {errors.cover && (
            <p className="text-sm text-red-500 text-center mb-2">{errors.cover}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
               <Input
                label="الاسم الأول"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="الاسم الأول"
                icon={User}
                className="text-sm sm:text-base p-2 sm:p-3"
                required
              />

              <Input
                label="الاسم الأخير"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="الاسم الأخير"
                icon={User}
                className="text-sm sm:text-base p-2 sm:p-3"
                required
              />
            </div>

            <Input
              label="رقم الهاتف"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="رقم الهاتف"
              icon={Phone}
              className="text-sm sm:text-base p-2 sm:p-3"
              required
            />

            <Input
              label="البريد الإلكتروني"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="البريد الإلكتروني"
              icon={Mail}
              className="text-sm sm:text-base p-2 sm:p-3"
              required
            />

            <Input
              label="كلمة المرور"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              className="text-sm sm:text-base p-2 sm:p-3"
              required
            />

            <Input
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-sm sm:text-base p-2 sm:p-3"
              required
            />

            <Input
              label="العنوان"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="العنوان"
              icon={MapPin}
              className="text-sm sm:text-base p-2 sm:p-3"
              required
            />

            <Button
              type="submit"
              className="w-full py-2 sm:py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg flex items-center justify-center text-sm sm:text-base"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              إنشاء حساب
            </Button>

            <p className="text-center text-xs sm:text-sm text-gray-500">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;