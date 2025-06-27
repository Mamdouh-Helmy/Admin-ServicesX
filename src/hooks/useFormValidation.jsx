import React from "react";
import { useState } from "react";

const useFormValidation = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validationRules = {
    firstName: {
      required: true,
      label: "الاسم الأول",
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      required: true,
      label: "الاسم الأخير",
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      label: "البريد الإلكتروني",
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "البريد الإلكتروني غير صالح",
    },
    phone: {
      required: true,
      label: "رقم الهاتف",
      pattern: /^[0-9]{11}$/,
      message: "رقم الهاتف يجب أن يكون 11 رقمًا",
    },
    password: {
      required: true,
      label: "كلمة المرور",
      minLength: 8,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف، رقم، ورمز خاص",
    },
    newPassword: {
      required: true,
      label: "كلمة المرور الجديدة",
      minLength: 8,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "كلمة المرور الجديدة يجب أن تحتوي على 8 أحرف على الأقل، حرف، رقم، ورمز خاص",
    },
    confirmPassword: {
      required: true,
      label: "تأكيد كلمة المرور",
      matchMessage: "تأكيد كلمة المرور غير مطابق",
    },
    address: {
      required: true,
      label: "العنوان",
      minLength: 2,
      maxLength: 100,
    },
    otp: {
      required: true,
      label: "رمز التحقق",
      pattern: /^[0-9]{6}$/,
      message: "رمز التحقق يجب أن يكون 6 أرقام",
    },
    name: {
      required: true,
      label: "اسم الخدمة",
      minLength: 2,
      maxLength: 100,
    },
    description: {
      required: true,
      label: "وصف الخدمة",
      minLength: 10,
      maxLength: 500,
    },
    cover: {
      required: true,
      label: "صورة الخدمة",
    },
  };

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return "";

    let error = "";

    if (rules.required && !value) {
      error = `${rules.label} مطلوب`;
    } else if (rules.minLength && value && value.length < rules.minLength) {
      error = `${rules.label} يجب أن يكون ${rules.minLength} أحرف على الأقل`;
    } else if (rules.maxLength && value && value.length > rules.maxLength) {
      error = `${rules.label} يجب ألا يتجاوز ${rules.maxLength} أحرف`;
    } else if (rules.pattern && value && !rules.pattern.test(value)) {
      error = rules.message || `${rules.label} غير صالح`;
    } else if (rules.min && value && Number(value) < rules.min) {
      error =
        rules.minMessage || `${rules.label} يجب أن يكون أكبر من ${rules.min}`;
    } else if (rules.max && value && Number(value) > rules.max) {
      error =
        rules.maxMessage || `${rules.label} يجب أن يكون أقل من ${rules.max}`;  
    } else if (name === "confirmPassword" && value) {
      const matchField = "password" in formData ? "password" : "newPassword";
      if (value !== formData[matchField]) {
        error = rules.matchMessage || `${rules.label} غير مطابق`;
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAll = (profilePicture) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      newErrors[name] = error;
      if (error) isValid = false;
    });

    if (typeof profilePicture !== "undefined") {
      const coverError = validateField("cover", profilePicture);
      newErrors.cover = coverError;
      if (coverError) isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return { 
    formData, 
    errors, 
    handleChange, 
    validateAll, 
    setErrors, 
    clearErrors,
    setFormData 
  };
};

export default useFormValidation;