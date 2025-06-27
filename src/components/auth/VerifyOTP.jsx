import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useNotification } from '../../context/NotificationContext.jsx';
import apiService from '../../services/api.js';
import verifyOtpImage from '../../assets/verifyemail.svg';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        setError('');
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('أدخل رمز التحقق كاملاً (6 أرقام)');
      return;
    }

    // Validate that all characters are numbers
    if (!/^\d{6}$/.test(otpCode)) {
      setError('رمز التحقق يجب أن يحتوي على أرقام فقط');
      return;
    }

    setLoading(true);
    try {
      await apiService.verifyOtp({ 
        email: email, 
        otp: otpCode 
      });
      showSuccess('تم التحقق من الرمز بنجاح');
      navigate('/reset-password', { 
        state: { 
          email: email, 
          otp: otpCode 
        } 
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      showError(error.message || 'رمز التحقق غير صحيح');
      setError('رمز التحقق غير صحيح');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      await apiService.forgotPassword(email);
      showSuccess('تم إعادة إرسال رمز التحقق');
      // Clear current OTP
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
    } catch (error) {
      showError(error.message || 'فشل في إعادة إرسال رمز التحقق');
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
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">التحقق من الرمز</h1>
            <p className="text-xs sm:text-sm md:text-base mt-1">أدخل رمز التحقق المرسل إلى بريدك الإلكتروني</p>
            {email && (
              <p className="text-xs sm:text-sm md:text-base mt-1">{email}</p>
            )}
          </div>

          {/* Illustration */}
          <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex justify-center">
            <img
              src={verifyOtpImage}
              alt="التحقق من الرمز"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
            />
          </div>

          {/* Inputs & Button */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8  space-y-4">
            <div className="flex justify-center gap-2" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`
                    w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
                    text-center font-medium
                    text-base sm:text-lg md:text-xl
                    border rounded-lg
                    focus:ring-2 focus:ring-primary
                    transition
                    ${error ? 'border-red-500' : 'border-gray-300'}
                  `}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-xs sm:text-sm md:text-base text-center">{error}</p>
            )}

            <Button
              type="submit"
              loading={loading}
              icon={ArrowRight}
              disabled={otp.join('').length !== 6}
              className="w-full py-2 sm:py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg text-xs sm:text-sm md:text-base flex items-center justify-center"
            >
              تحقق من الرمز
            </Button>

           
          </form>
           <div className="my-6 text-center space-y-4">
            <p className="text-gray-600 text-sm">
              لم تتلق الرمز؟{' '}
              <button
                type="button"
                onClick={resendOtp}
                disabled={loading}
                className="text-primary hover:text-primary-dark font-medium transition-colors disabled:opacity-50"
              >
                إعادة الإرسال
              </button>
            </p>
            
            <p className="text-gray-600 text-sm">
              <Link
                to="/forgot-password"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                العودة لاستعادة كلمة المرور
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;