import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';
import resetPasswordImage from '../../assets/cahnge_password_image.svg';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const otp = state?.otp;
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { formData, errors, handleChange, validateAll } = useFormValidation({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!email || !otp) navigate('/forgot-password');
  }, [email, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    try {
      await apiService.resetPassword({ email, otp, newPassword: formData.newPassword });
      showSuccess('تم إعادة تعيين كلمة المرور بنجاح');
      navigate('/login');
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
            <CheckCircle className="mx-auto w-10 h-10" />
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mt-2">إعادة تعيين كلمة المرور</h1>
            <p className="text-xs sm:text-sm md:text-base mt-1">أدخل كلمة المرور الجديدة</p>
          </div>

          {/* Illustration */}
          <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex justify-center">
            <img
              src={resetPasswordImage}
              alt="Reset Password"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 space-y-4">
            <Input
              label="كلمة المرور الجديدة"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              placeholder="••••••••"
              // icon={Lock}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              className="text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
            />

            <Input
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              // icon={Lock}
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
            />

            <Button
              type="submit"
              loading={loading}
              icon={ArrowRight}
              className="w-full py-2 sm:py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg text-sm sm:text-base md:text-lg flex items-center justify-center"
            >
              إعادة تعيين كلمة المرور
            </Button>

            <p className="text-center text-xs sm:text-sm md:text-base text-gray-500">
              تذكرت كلمة المرور؟{' '}
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

export default ResetPassword;