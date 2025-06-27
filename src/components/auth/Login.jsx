import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, Eye, EyeOff } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';
import loginImage from '../../assets/loginimage.svg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { formData, errors, handleChange, validateAll } = useFormValidation({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      const response = await apiService.login(formData);
      login(response);
      showSuccess('تم تسجيل الدخول بنجاح');
      navigate('/dashboard');
    } catch (error) {
      showError(error.message);
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
            <p className="text-xs sm:text-sm mt-1">نظام حجز الفنيين المحترفين</p>
          </div>

          {/* Image */}
          <div className="p-4 sm:p-6 flex justify-center">
            <img
              src={loginImage}
              alt="تسجيل الدخول"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
            <div className="text-center">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">تسجيل الدخول</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">من فضلك أدخل بياناتك</p>
            </div>

            <div className="relative">
              <Input
                label="البريد الإلكتروني"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="البريد الإلكتروني"
                icon={Mail}
                className="text-sm sm:text-base p-2 sm:p-3" // استبدلنا inputClass بـ className
              />
            </div>

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
              className="text-sm sm:text-base p-2 sm:p-3" // استبدلنا inputClass بـ className
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-2 sm:py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg flex items-center justify-center text-sm sm:text-base"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              تسجيل الدخول
            </Button>

            <p className="text-center text-xs sm:text-sm text-gray-500">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
