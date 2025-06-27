import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';
import forgotPasswordImage from '../../assets/verifyemail.svg';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);

  const { formData, errors, handleChange, validateAll } = useFormValidation({ email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    try {
      await apiService.forgotPassword(formData.email);
      showSuccess('تم إرسال رمز التحقق إلى بريدك الإلكتروني');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light/20 to-primary/10 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-4 sm:p-6 md:p-8 text-white text-center">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              استعادة كلمة المرور
            </h1>
            <p className="text-xs sm:text-sm md:text-base mt-1">
              أدخل بريدك الإلكتروني لاستعادة الحساب
            </p>
          </div>

          {/* Illustration */}
          <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex justify-center">
            <img
              src={forgotPasswordImage}
              alt="استعادة كلمة المرور"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 space-y-4"
          >
            <Input
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="example@example.com"
              icon={Mail}
              className="text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"  // تم التغيير هنا من inputClass إلى className
            />

            <Button
              type="submit"
              loading={loading}
              icon={Send}
              className="w-full py-2 sm:py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg text-sm sm:text-base md:text-lg flex items-center justify-center"
            >
              إرسال رمز التحقق
            </Button>

            <p className="text-center text-xs sm:text-sm md:text-base text-gray-500">
              تذكرت كلمة المرور؟{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                العودة لتسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;