import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const backgrounds = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1586232880819-5d06b672c942?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1688989667207-4dce9c98ed2f?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

interface LoginData {
  user_name: string;
  password: string;
}

interface SignupData {
  user_name: string;
  user_email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
  fluencyLevel: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface Message {
  type: string;
  text: string;
}

const Hero = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [bgIndex, setBgIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  // Login form state
  const [loginData, setLoginData] = useState<LoginData>({
    user_name: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState<SignupData>({
    user_name: "",
    user_email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
    fluencyLevel: "",
  });

  // Validation errors
  const [loginErrors, setLoginErrors] = useState<ValidationErrors>({});
  const [signupErrors, setSignupErrors] = useState<ValidationErrors>({});

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    // Check if user is already logged in
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/connect", { replace: true });
    }

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Login validation
  const validateLogin = (): boolean => {
    const errors: ValidationErrors = {};
    if (!loginData.user_name.trim()) {
      errors.user_name = "Username is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Signup validation
  const validateSignup = (): boolean => {
    const errors: ValidationErrors = {};
    if (!signupData.user_name.trim()) {
      errors.user_name = "Username is required";
    } else if (signupData.user_name.length < 3) {
      errors.user_name = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupData.user_email.trim()) {
      errors.user_email = "Email is required";
    } else if (!emailRegex.test(signupData.user_email)) {
      errors.user_email = "Invalid email format";
    }

    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!signupData.country) {
      errors.country = "Please select a country";
    }

    if (!signupData.gender) {
      errors.gender = "Please select a gender";
    }

    if (!signupData.fluencyLevel) {
      errors.fluencyLevel = "Please select your fluency level";
    }

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateLogin()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: loginData.user_name,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        // Store access_token and refresh_token (based on your Postman response structure)
        if (data.accessToken) {
          localStorage.setItem("access_token", data.accessToken);
          console.log("Access token stored:", data.accessToken);
        }
        if (data.refreshToken) {
          localStorage.setItem("refresh_token", data.refreshToken);
          console.log("Refresh token stored");
        }
        
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        
        // Reset form
        setLoginData({ user_name: "", password: "" });
        
        // Navigate after a short delay
        setTimeout(() => {
          navigate("/connect", { replace: true });
        }, 1000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        type: "error",
        text: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateSignup()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: signupData.user_name,
          user_email: signupData.user_email,
          password: signupData.password,
          country: signupData.country,
          gender: signupData.gender,
          fluencyLevel: signupData.fluencyLevel,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registration successful! Please login with your credentials.",
        });
        
        // Reset form
        setSignupData({
          user_name: "",
          user_email: "",
          password: "",
          confirmPassword: "",
          country: "",
          gender: "",
          fluencyLevel: "",
        });
        
        // Switch to login form after 2 seconds
        setTimeout(() => {
          setShowLogin(true);
          setMessage({ type: "", text: "" });
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage({
        type: "error",
        text: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="w-full min-h-screen pt-20 relative bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-8 md:py-0">
          <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-white items-center lg:ml-29">
            {/* Left Content */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Speak English <span className="text-indigo-400">Fluently</span>{" "}
                and <span className="text-rose-400">Confidently</span>
              </h1>
              <p className="mt-6 text-lg text-gray-200">
                Learn by speaking in real-time. Boost your confidence with
                guided practice and AI feedback.
              </p>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "#features")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition cursor-pointer no-underline"
                >
                  Explore Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                  className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-medium transition cursor-pointer no-underline"
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Right Side - Login / Sign Up */}
            <div className="relative z-10 w-full max-w-md mx-auto bg-white/10 border border-white/30 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 sm:p-10 text-white">
              <div className="flex mb-8 overflow-hidden border border-white/20 rounded-full">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMessage({ type: "", text: "" });
                    setLoginErrors({});
                    setSignupErrors({});
                  }}
                  className={`w-1/2 py-2 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                    showLogin
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                      : "text-slate-100 hover:bg-white/10"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setMessage({ type: "", text: "" });
                    setLoginErrors({});
                    setSignupErrors({});
                  }}
                  className={`w-1/2 py-2 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                    !showLogin
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                      : "text-slate-100 hover:bg-white/10"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Message Display */}
              {message.text && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-100"
                      : "bg-red-500/20 border border-red-500/50 text-red-100"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {showLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/90 mb-2">
                      Email or Username
                    </label>
                    <input
                      type="text"
                      value={loginData.user_name}
                      onChange={(e) =>
                        setLoginData({ ...loginData, user_name: e.target.value })
                      }
                      className={`w-full bg-white/80 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        loginErrors.user_name ? "ring-2 ring-red-500" : ""
                      }`}
                      placeholder="Enter your email or username"
                    />
                    {loginErrors.user_name && (
                      <p className="text-red-300 text-xs mt-1">
                        {loginErrors.user_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-white/90 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className={`w-full bg-white/80 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        loginErrors.password ? "ring-2 ring-red-500" : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    {loginErrors.password && (
                      <p className="text-red-300 text-xs mt-1">
                        {loginErrors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-lg shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  <div className="mt-6">
                    <p className="text-sm text-center text-white/70 mb-4">
                      Or continue with
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition text-gray-800 text-sm shadow-md cursor-pointer"
                      >
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                          alt="Google"
                          className="w-5 h-5"
                        />
                        Google
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b5998] hover:bg-[#2d4373] transition text-white text-sm shadow-md cursor-pointer"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.762v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
                        </svg>
                        Facebook
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={signupData.user_name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, user_name: e.target.value })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          signupErrors.user_name ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Choose username"
                      />
                      {signupErrors.user_name && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.user_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={signupData.user_email}
                        onChange={(e) =>
                          setSignupData({ ...signupData, user_email: e.target.value })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          signupErrors.user_email ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Your email"
                      />
                      {signupErrors.user_email && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.user_email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({ ...signupData, password: e.target.value })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          signupErrors.password ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Create password"
                      />
                      {signupErrors.password && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          signupErrors.confirmPassword ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Confirm password"
                      />
                      {signupErrors.confirmPassword && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Country
                      </label>
                      <select
                        value={signupData.country}
                        onChange={(e) =>
                          setSignupData({ ...signupData, country: e.target.value })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                          signupErrors.country ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select Country</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Other">Other</option>
                      </select>
                      {signupErrors.country && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.country}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Gender
                      </label>
                      <select
                        value={signupData.gender}
                        onChange={(e) =>
                          setSignupData({ ...signupData, gender: e.target.value })
                        }
                        className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                          signupErrors.gender ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {signupErrors.gender && (
                        <p className="text-red-300 text-xs mt-1">
                          {signupErrors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/90 mb-1">
                      English Fluency Level
                    </label>
                    <select
                      value={signupData.fluencyLevel}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fluencyLevel: e.target.value })
                      }
                      className={`w-full bg-white/80 text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                        signupErrors.fluencyLevel ? "ring-2 ring-red-500" : ""
                      }`}
                    >
                      <option value="">Select Fluency Level</option>
                      <option value="Beginner">Beginner - Just starting out</option>
                      <option value="Intermediate">
                        Intermediate - Can hold conversations
                      </option>
                      <option value="Advanced">Advanced - Fluent speaker</option>
                    </select>
                    {signupErrors.fluencyLevel && (
                      <p className="text-red-300 text-xs mt-1">
                        {signupErrors.fluencyLevel}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 text-white font-semibold py-2.5 rounded-lg shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>

                  <div className="mt-4">
                    <p className="text-sm text-center text-white/70 mb-3">
                      Or continue with
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition text-gray-800 text-xs shadow-md cursor-pointer"
                      >
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                          alt="Google"
                          className="w-4 h-4"
                        />
                        Google
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3b5998] hover:bg-[#2d4373] transition text-white text-xs shadow-md cursor-pointer"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.762v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
                        </svg>
                        Facebook
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;