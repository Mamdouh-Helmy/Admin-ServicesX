const BASE_URL = "https://servicex.runasp.net/api";

class ApiService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Check if response is ok first
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = "حدث خطأ في الشبكة";

        try {
          const errorText = await response.text();
          // Try to parse as JSON first
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = this.translateErrorMessage(
              errorData[0]?.code ||
                errorData.message ||
                errorData.error ||
                errorText
            );
          } catch {
            // If not JSON, use the text directly
            errorMessage =
              this.translateErrorMessage(errorText) ||
              `خطأ ${response.status}: ${this.getStatusText(response.status)}`;
          }
        } catch {
          errorMessage = `خطأ ${response.status}: ${this.getStatusText(
            response.status
          )}`;
        }

        throw new Error(errorMessage);
      }

      // Try to parse response as JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        // If not JSON, return text
        const text = await response.text();
        return { message: text };
      }
    } catch (error) {
      // If it's already our custom error, throw it
      if (error.message !== "Failed to fetch") {
        throw error;
      }
      // Network error
      throw new Error("فشل في الاتصال بالخادم. تأكد من اتصالك بالإنترنت");
    }
  }

  translateErrorMessage(message) {
    const translations = {
      DuplicateUserName: "البريد الإلكتروني مستخدم من قبل",
      "Invalid email or password": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      "Email already exists": "البريد الإلكتروني موجود مسبقاً",
      "User not found": "المستخدم غير موجود",
      "Invalid OTP": "رمز التحقق غير صحيح",
      "OTP expired": "انتهت صلاحية رمز التحقق",
      Unauthorized: "غير مصرح لك بالوصول",
      "Access denied": "تم رفض الوصول",
      "Invalid token": "رمز المصادقة غير صالح",
      "Token expired": "انتهت صلاحية رمز المصادقة",
      Forbidden: "ممنوع الوصول",
      "Not found": "غير موجود",
      "Internal server error": "خطأ في الخادم الداخلي",
      "Bad request": "طلب غير صالح",
      "Service unavailable": "الخدمة غير متاحة",
      "Network error": "خطأ في الشبكة",
      "Validation failed": "فشل في التحقق من البيانات",
      "File too large": "حجم الملف كبير جداً",
      "Invalid file type": "نوع الملف غير مدعوم",
      "Missing required field": "حقل مطلوب مفقود",
    };

    // Check if message matches any error code or message
    for (const [key, arabic] of Object.entries(translations)) {
      if (
        message &&
        (message === key || message.toLowerCase().includes(key.toLowerCase()))
      ) {
        return arabic;
      }
    }

    return message;
  }

  getStatusText(status) {
    const statusTexts = {
      400: "طلب غير صالح",
      401: "غير مصرح",
      403: "ممنوع",
      404: "غير موجود",
      413: "حجم الملف كبير جداً",
      415: "نوع الملف غير مدعوم",
      422: "بيانات غير صالحة",
      500: "خطأ في الخادم",
      502: "خطأ في البوابة",
      503: "الخدمة غير متاحة",
    };

    return statusTexts[status] || "خطأ غير معروف";
  }

  // Auth endpoints
  async register(userData) {
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (key === "cover" && userData[key]) {
        userData[key].forEach((file) => {
          formData.append("cover", file);
        });
      } else {
        formData.append(key, userData[key]);
      }
    });

    return this.request("/auth/register", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store token if login successful
    if (response.token) {
      this.setToken(response.token);
      localStorage.setItem("authToken", response.token);
    }

    return response;
  }

  async forgotPassword(email) {
    return this.request("/Auth/forget-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtp(data) {
    // تغيير اسم الحقل من otp إلى OtpCode حسب متطلبات الباك إند
    const requestData = {
      email: data.email,
      OtpCode: data.otp, // تغيير من otp إلى OtpCode
    };

    return this.request("/Auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(requestData),
    });
  }

  async resetPassword(data) {
    return this.request("/Auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Service endpoints
  async createService(serviceData) {
    const formData = new FormData();

    // Add text fields
    formData.append("name", serviceData.name);
    formData.append("Description", serviceData.description);

    // Add files
    if (serviceData.cover && serviceData.cover.length > 0) {
      Array.from(serviceData.cover).forEach((file) => {
        formData.append("Cover", file);
      });
    }

    const response = await this.request("/service", {
      method: "POST",
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it for FormData
        Authorization: this.token ? `Bearer ${this.token}` : undefined,
      },
    });

    // Log activity after successful service creation
    this.logActivity("service", "تم إضافة خدمة جديدة", serviceData.name);

    return response;
  }

  async getServices() {
    return this.request("/service");
  }

  // Codes endpoints
  async createCode() {
    const response = await this.request("/CodesForCharges", {
      method: "POST",
    });

    // Log activity after successful code creation
    this.logActivity(
      "code",
      "تم إنشاء كود شحن جديد",
      response.code || "كود جديد"
    );

    return response;
  }

  async getCodes() {
    return this.request("/CodesForCharges");
  }

  // Users endpoints
  async getUsers() {
    return this.request("/Admin/dashboard-stats");
  }

  async getUsersByRole(role) {
    return this.request(`/users?role=${role}`);
  }

  // Statistics endpoints
  async getStatistics() {
    return this.request("/statistics");
  }

  // Activity endpoints
  async getRecentActivities() {
    return this.request("/activities/recent");
  }

  // Support endpoint
  async sendSupportMessage(messageData) {
    const response = await this.request("/Support/send", {
      method: "POST",
      body: JSON.stringify(messageData),
    });

    // Log activity after successful support message
    this.logActivity("support", "تم إرسال رسالة للدعم الفني", messageData.Message);

    return response;
  }

  // Log activity to localStorage (since we don't have a backend endpoint yet)
  logActivity(type, title, details = "") {
    try {
      const activities = JSON.parse(
        localStorage.getItem("userActivities") || "[]"
      );
      const user = this.getCurrentUser();

      const newActivity = {
        id: Date.now(),
        type,
        title,
        details,
        time: new Date().toISOString(),
        userId: user?.id,
        userName: `${user?.firstName} ${user?.lastName}`,
      };

      activities.unshift(newActivity);

      // Keep only last 50 activities
      if (activities.length > 50) {
        activities.splice(50);
      }

      localStorage.setItem("userActivities", JSON.stringify(activities));
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  }

  // Get activities from localStorage
  getLocalActivities() {
    try {
      const activities = JSON.parse(
        localStorage.getItem("userActivities") || "[]"
      );
      return activities.map((activity) => ({
        ...activity,
        timeAgo: this.getTimeAgo(activity.time),
      }));
    } catch (error) {
      console.error("Error getting local activities:", error);
      return [];
    }
  }

  // Helper function to format time ago
  getTimeAgo(timestamp) {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return "الآن";
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `منذ ${diffInWeeks} أسبوع`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `منذ ${diffInMonths} شهر`;
  }

  // Initialize token from localStorage
  initializeToken() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.setToken(token);
    }
  }

  // Decode JWT token to get user info
  decodeToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // Get current user info from token
  getCurrentUser() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    return {
      id: decoded.sub || decoded.userId,
      email: decoded.email,
      firstName: decoded.given_name || decoded.firstName,
      lastName: decoded.family_name || decoded.lastName,
      role: decoded.role,
      phone: decoded.phone_number || decoded.phone,
      address: decoded.address,
    };
  }
}

const apiService = new ApiService();
apiService.initializeToken();

export default apiService;