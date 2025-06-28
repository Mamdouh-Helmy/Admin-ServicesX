import React from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Users, Lock, Clock, Ban, Upload, Home } from 'lucide-react';

const PolicySection = ({ icon: Icon, title, items, color }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
      
      <div className="relative">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  const policyData = [
    {
      icon: Users,
      title: "المعلومات الشخصية",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      items: [
        "يجب على المستخدمين إدخال معلومات شخصية دقيقة وكاملة عند التسجيل.",
        "يتحمل المستخدمون مسؤولية الحفاظ على سرية وأمان بيانات تسجيل الدخول الخاصة بهم.",
        "يجب تحديث المعلومات الشخصية عند حدوث أي تغيير لضمان دقة البيانات."
      ]
    },
    {
      icon: Shield,
      title: "استخدام التطبيق",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      items: [
        "يجب أن تتم جميع المعاملات وطلبات الخدمات من خلال التطبيق الرسمي فقط.",
        "يُمنع استخدام التطبيق لأي أنشطة خارج نطاق خدمات الصيانة المنزلية المحددة.",
        "يجب استخدام التطبيق بطريقة قانونية ومسؤولة في جميع الأوقات."
      ]
    },
    {
      icon: Ban,
      title: "السلوك المحظور",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      items: [
        "سيتم إيقاف الحساب فورًا في حالة حدوث أي تحرش أو استخدام لغة مسيئة أو احتيال.",
        "لا يُسمح للمستخدمين بالتحايل أو إساءة استخدام نظام الدفع أو التقييم.",
        "يُمنع منعاً باتاً استخدام التطبيق لأي أنشطة غير قانونية أو ضارة."
      ]
    },
    {
      icon: Users,
      title: "التواصل والاحترافية",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      items: [
        "يجب أن يتم التواصل بين الفنيين والعملاء باحترام واحترافية في جميع الأوقات.",
        "يجب الالتزام بالمواعيد المحددة واحترام وقت جميع الأطراف.",
        "في حالة وجود أي مشكلة، يجب التواصل مع الدعم الفني فوراً."
      ]
    },
    {
      icon: Clock,
      title: "المواعيد والإلغاء",
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      items: [
        "يجب تحديد وقت وتاريخ الخدمة بدقة، وقد يتم فرض رسوم على الإلغاء في اللحظات الأخيرة.",
        "يُنصح بإعطاء إشعار مسبق كافي في حالة الحاجة لإلغاء أو تأجيل الموعد.",
        "سيتم تطبيق سياسة الإلغاء حسب الشروط والأحكام المحددة."
      ]
    },
    {
      icon: Upload,
      title: "المحتوى والملفات",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      items: [
        "يجب ألا تحتوي الصور أو الملفات المرفوعة على محتوى ضار أو غير قانوني أو غير لائق.",
        "جميع المحتويات المرفوعة يجب أن تكون متعلقة بالخدمة المطلوبة فقط.",
        "تحتفظ المنصة بحق مراجعة وحذف أي محتوى ينتهك هذه السياسات."
      ]
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl lg:rounded-4xl shadow-2xl p-6 lg:p-10 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 lg:w-60 lg:h-60 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"></div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text">
                  سياسة الاستخدام
                </h1>
                <p className="text-purple-100 text-lg lg:text-xl font-medium">
                  الشروط والأحكام الخاصة باستخدام منصة سيرفيس إكس
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/20">
              <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-300 mx-auto mb-2" />
              <span className="text-sm font-medium block text-purple-100">حماية وأمان</span>
              <div className="text-2xl lg:text-3xl font-bold">100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 lg:p-8 border-2 border-amber-200 shadow-xl">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-amber-900 mb-3">تنبيه هام</h3>
            <p className="text-amber-800 leading-relaxed text-sm lg:text-base">
              <strong>تحتفظ المنصة بحق إيقاف أو حذف أي حساب ينتهك هذه السياسات.</strong> 
              يُرجى قراءة جميع البنود بعناية والالتزام بها لضمان تجربة آمنة ومريحة لجميع المستخدمين.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {policyData.map((section, index) => (
          <PolicySection
            key={index}
            icon={section.icon}
            title={section.title}
            items={section.items}
            color={section.color}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 text-center">
        <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
          <Home className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900">سيرفيس إكس</h3>
        </div>
        <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
          نحن ملتزمون بتوفير خدمة آمنة وموثوقة لجميع مستخدمينا. 
          في حالة وجود أي استفسارات حول سياسة الاستخدام، يُرجى التواصل مع فريق الدعم الفني.
        </p>
        <div className="mt-6 text-xs text-gray-500">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;