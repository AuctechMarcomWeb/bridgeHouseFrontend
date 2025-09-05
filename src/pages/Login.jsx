/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Home, Mail, Lock, User, Phone } from "lucide-react";
import logo from "../assets/bridge-house.png";
import { Link, useNavigate ,} from "react-router-dom";

export default function Login() {
  const [step, setStep] = useState(1); // 1=Phone, 2=OTP, 3=Signup/Login
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isNewUser, setIsNewUser] = useState(true); // decide if signup or login
  const [error, setError] = useState("");
  //const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: "",
  });

  // --- Step 1: Phone Submit ---
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone) return setError("Please enter your mobile number");
    if (!/^[0-9]{10}$/.test(phone))
      return setError("Enter a valid 10-digit number");

    const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otpValue);
    console.log("Generated OTP:", otpValue);

    setError("");
    setStep(2);
  };
  // --- Step 2: OTP Verify ---
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) return setError("Enter OTP");
    if (otp !== generatedOtp) return setError("Invalid OTP");

    setError("");
    setFormData({ ...formData, phone });
    setStep(3);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Step 3: Signup/Login Submit ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData, "New user?", isNewUser);
   navigate("/");
    // Call your API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className=" bg-[#005697] p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="hidden md:block relative z-10">
            <div className="flex items-center justify-center mb-8 ">
              <div
                onClick={() => navigate("/")}
                className="w-30 rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img src={logo} alt="" />
              </div>
            </div>

            <h2 className="md:text-3xl text-xl font-bold mb-6 leading-tight">
              Find Your Dream Home Today
            </h2>

            <p className="2xl:text-lg text-base  text-blue-100 mb-8 leading-relaxed">
              Join thousands of satisfied customers who found their perfect
              property through our premium real estate platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">Verified Properties</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">Expert Consultations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">Secure Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-12 flex items-center">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-6">
              <h5 className="text-xl font-semibold text-gray-800">
                {step === 1 && "Signup / Login"}
                {step === 2 && "Verify OTP"}
                {step === 3 && (isNewUser ? "Sign Up" : "Login")}
              </h5>
            </div>
            {/* Step 1: Phone Input */}
            {step === 1 && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (error) setError("");
                    }}
                    className={`mt-2 block w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter mobile number"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Get OTP
                </button>

                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNewUser(false);
                    setStep(3); 
                  }}
                >
                  Login with password
                </Link>
              </form>
            )}
            {/* Step 2: OTP Input */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (error) setError("");
                    }}
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Signup{" "}
                </button>
                <p className="text-sm text-gray-600">
                  Didn’t receive code?{" "}
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      const otpValue = Math.floor(
                        1000 + Math.random() * 9000
                      ).toString();
                      setGeneratedOtp(otpValue);
                      console.log("Resent OTP:", otpValue);
                    }}
                  >
                    Resend OTP
                  </a>
                </p>
              </form>
            )}

            {/* Step 3: Signup/Login Form */}
            {step === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* New User Signup Form */}
                {isNewUser ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                  </>
                ) : null}

                {/* Phone Input (common for both) */}
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* Password Input (both signup & login) */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm password + user type only for signup */}
                {isNewUser && (
                  <>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Buyer/Seller radio */}
                    <div className="flex gap-6">
                      {["buyer", "seller"].map((type) => (
                        <label
                          key={type}
                          className="relative flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="userType"
                            value={type}
                            checked={formData.userType === type}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center peer-checked:bg-blue-500 relative">
                            {formData.userType === type && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <span className="ml-3 text-gray-700">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
              {/* Terms & Conditions (Sign Up Only) */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#005697] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {isNewUser ? "Sign Up" : "Login"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
