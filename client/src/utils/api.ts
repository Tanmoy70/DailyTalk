const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Define response types
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: unknown;
}

// Helper function to get auth headers with Bearer token
export const getAuthHeaders = (): HeadersInit => {
  const accessToken = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

// Function to refresh access token using refresh token
export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refresh_token");
  
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }), // Changed from refresh_token
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      localStorage.setItem("access_token", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refresh_token", data.refreshToken);
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
};

// Generic API call function with automatic token refresh
export const apiCall = async <T = unknown>(
  endpoint: string,
  method: string = "GET",
  body?: Record<string, unknown>,
  retryCount: number = 0
): Promise<ApiResponse<T>> => {
  try {
    const options: RequestInit = {
      method,
      headers: getAuthHeaders(),
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    // If unauthorized and haven't retried yet, try to refresh token
    if (response.status === 401 && retryCount === 0) {
      const refreshed = await refreshAccessToken();
      
      if (refreshed) {
        // Retry the request with new token
        return apiCall<T>(endpoint, method, body, retryCount + 1);
      } else {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        throw new Error("Session expired. Please login again.");
      }
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error };
  }
};

// Logout function to clear tokens
export const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/";
};

// Define user profile type
interface UserProfile {
  user_name: string;
  user_email: string;
  country: string;
  gender: string;
  fluencyLevel: string;
}

// Example usage functions
export const getUserProfile = (): Promise<ApiResponse<UserProfile>> => 
  apiCall<UserProfile>("/api/v1/user/profile", "GET");

export const updateUserProfile = (
  profileData: Partial<UserProfile>
): Promise<ApiResponse<UserProfile>> =>
  apiCall<UserProfile>("/api/v1/user/profile", "PUT", profileData);