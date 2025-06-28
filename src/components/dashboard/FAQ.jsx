import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Star, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle, category }) => {
    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'account': return <User className="w-5 h-5" />;
            case 'service': return <Star className="w-5 h-5" />;
            case 'payment': return <AlertCircle className="w-5 h-5" />;
            case 'technical': return <CheckCircle className="w-5 h-5" />;
            default: return <HelpCircle className="w-5 h-5" />;
        }
    };

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'account': return 'text-blue-600 bg-blue-100';
            case 'service': return 'text-green-600 bg-green-100';
            case 'payment': return 'text-amber-600 bg-amber-100';
            case 'technical': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full p-6 lg:p-8 text-right focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryColor(category)}`}>
                            {getCategoryIcon(category)}
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 text-right flex-1">
                            {question}
                        </h3>
                    </div>
                    <div className="mr-4">
                        {isOpen ? (
                            <ChevronUp className="w-6 h-6 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-gray-500" />
                        )}
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex items-start space-x-3 space-x-reverse">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{answer}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const [openItems, setOpenItems] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const faqData = [
        {
            id: 1,
            category: 'account',
            question: "❓ أنا نسيت كلمة المرور، أعمل إيه؟",
            answer: "✅ تقدر تستخدم ميزة \"نسيت كلمة المرور\" الموجودة في صفحة تسجيل الدخول، هيتم إرسال كود تأكيد على بريدك الإلكتروني وبعدها تقدر تعيّن كلمة مرور جديدة."
        },
        {
            id: 2,
            category: 'service',
            question: "❓ أنا طلبت خدمة والفني ماجاش، أتصرف إزاي؟",
            answer: "✅ بنعتذر عن اللي حصل، برجاء التواصل مع الدعم من خلال التطبيق مع توضيح رقم الطلب، وفريقنا هيتابع المشكلة فورًا ويتواصل معاك."
        },
        {
            id: 3,
            category: 'service',
            question: "❓ الفني خلص الشغل بس مش عارف أقيمه؟",
            answer: "✅ لازم يتم إنهاء الطلب من الطرفين (الفني والعميل) علشان يظهرلك خيار التقييم، تأكد إنك ضغطت على \"تم إنهاء الطلب\"."
        },
        {
            id: 4,
            category: 'account',
            question: "❓ إزاي أعدل بيانات الحساب بتاعي؟",
            answer: "✅ من صفحة \"البروفايل\"، هتلاقي زر تعديل، ومن خلاله تقدر تغيّر الاسم، الصورة، أو رقم التليفون."
        },
        {
            id: 5,
            category: 'payment',
            question: "❓ الفني طلب مني فلوس زيادة غير المكتوبة؟",
            answer: "✅ ده مخالف لسياسات التطبيق. برجاء إرسال رقم الطلب وإحنا هنتعامل مع المشكلة بسرية وجدية كاملة."
        },
        {
            id: 6,
            category: 'service',
            question: "❓ هل ممكن أطلب نفس الفني مرة تانية؟",
            answer: "✅ أكيد، بعد ما يخلص الطلب الأول وتقيّمه، تقدر ترجع على بروفايله وتطلبه من تاني لأي خدمة مستقبلية."
        },
        {
            id: 7,
            category: 'technical',
            question: "❓ التطبيق بطيء أو مش شغال كويس؟",
            answer: "✅ جرب تقفل التطبيق وتفتحه تاني، أو امسح الكاش من إعدادات التطبيق. لو المشكلة لسه موجودة، تواصل مع الدعم الفني."
        },
        {
            id: 8,
            category: 'service',
            question: "❓ إيه المدة المتوقعة لوصول الفني؟",
            answer: "✅ عادة بيوصل الفني في خلال 30-60 دقيقة من تأكيد الطلب، حسب المنطقة وتوفر الفنيين. هتوصلك رسالة بتفاصيل الموعد المتوقع."
        }
    ];

    const categories = [
        { id: 'all', name: 'جميع الأسئلة', icon: HelpCircle, color: 'text-gray-600' },
        { id: 'account', name: 'الحساب', icon: User, color: 'text-blue-600' },
        { id: 'service', name: 'الخدمات', icon: Star, color: 'text-green-600' },
        { id: 'payment', name: 'الدفع', icon: AlertCircle, color: 'text-amber-600' },
        { id: 'technical', name: 'تقني', icon: CheckCircle, color: 'text-purple-600' }
    ];

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredFAQs = faqData.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 lg:space-y-8 p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl lg:rounded-4xl shadow-2xl p-6 lg:p-10 text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 lg:w-60 lg:h-60 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-xl animate-pulse"></div>

                <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                                <HelpCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-100 bg-clip-text">
                                    الأسئلة الشائعة
                                </h1>
                                <p className="text-emerald-100 text-lg lg:text-xl font-medium">
                                    إجابات سريعة على أكثر الأسئلة شيوعاً
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/20">
                            <MessageCircle className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-300 mx-auto mb-2" />
                            <span className="text-sm font-medium block text-emerald-100">إجمالي الأسئلة</span>
                            <div className="text-2xl lg:text-3xl font-bold">{faqData.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث في الأسئلة الشائعة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-12 pl-6 py-4 lg:py-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300 ${selectedCategory === category.id
                                            ? 'bg-emerald-500 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FAQ Items */}
            {filteredFAQs.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 lg:p-16 text-center border border-gray-100">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <HelpCircle className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        لا توجد نتائج للبحث
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                        لم يتم العثور على أسئلة تطابق كلمات البحث المطلوبة. جرب كلمات مختلفة أو تصفح جميع الأسئلة.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 lg:space-y-6">
                    {filteredFAQs.map((item) => (
                        <FAQItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            category={item.category}
                            isOpen={openItems[item.id]}
                            onToggle={() => toggleItem(item.id)}
                        />
                    ))}
                </div>
            )}

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 lg:p-8 border-2 border-blue-200 shadow-xl">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                        لم تجد إجابة لسؤالك؟
                    </h3>
                    <p className="text-blue-800 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                        فريق الدعم الفني متاح على مدار الساعة لمساعدتك في حل أي مشكلة أو الإجابة على استفساراتك.
                    </p>
                    <Link
                        to="/dashboard/support"
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        تواصل مع الدعم الفني
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;