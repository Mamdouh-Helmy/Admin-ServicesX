import React, { useState } from 'react';
import { Send, Mail, CheckCircle, AlertCircle, Clock, MessageSquare, User, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const Support = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message?.trim()) {
      setError('الرجاء إدخال رسالة الدعم');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً');
      }

      apiService.setToken(token);
      
      await apiService.sendSupportMessage({ 
        Message: message 
      });
      
      setStatus('success');
      setMessage('');
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Support request failed:', err);
      setStatus('error');
      setError(err.message || 'حدث خطأ في إرسال الرسالة. يرجى المحاولة لاحقًا.');
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 rounded-3xl lg:rounded-4xl shadow-2xl p-6 lg:p-10 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 lg:w-60 lg:h-60 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                <MessageSquare className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                  الدعم الفني
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium">
                  نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهك
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/20">
              <User className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-300 mx-auto mb-2" />
              <span className="text-sm font-medium block text-blue-100">حالة المستخدم</span>
              <div className="text-2xl lg:text-3xl font-bold">
                {user ? 'مسجل دخول' : 'زائر'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 space-x-reverse mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">إرسال رسالة للدعم الفني</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">
                اشرح مشكلتك أو استفسارك بالتفصيل
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                placeholder="أدخل رسالتك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === 'sending'}
              />
            </div>

            {error && (
              <div className="flex items-start space-x-3 space-x-reverse p-4 bg-red-50 rounded-2xl border border-red-200">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-start space-x-3 space-x-reverse p-4 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-green-600">
                  تم إرسال رسالتك بنجاح! سيتواصل معك فريق الدعم في أقرب وقت ممكن.
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:transform-none disabled:hover:shadow-xl flex items-center space-x-2 space-x-reverse"
              >
                {status === 'sending' ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 lg:p-8 border-2 border-amber-200 shadow-xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-amber-900 mb-1">وقت الاستجابة</h3>
              <p className="text-amber-800">
                عادةً ما يتم الرد خلال <span className="font-bold">24 ساعة</span> خلال أيام العمل
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 lg:p-8 border-2 border-blue-200 shadow-xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-1">البريد الإلكتروني</h3>
              <p className="text-blue-800">
                <a href="mailto:support@servicex.com" className="hover:underline">
                  support@servicex.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Link */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 lg:p-8 border-2 border-gray-200 shadow-xl text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
            قد تجد إجابات لأسئلتك في صفحة الأسئلة الشائعة
          </h3>
          <Link 
            to="/dashboard/faq" 
            className="inline-flex items-center space-x-2 space-x-reverse bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-blue-600 font-medium"
          >
            <HelpCircle className="w-5 h-5" />
            <span>تصفح الأسئلة الشائعة</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;