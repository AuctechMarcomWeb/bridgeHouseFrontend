/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from "react";
import {
  Eye,
  EyeOff,
  Home,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  Luggage,
  MapPin,
} from "lucide-react";
import logo from "../assets/bridge-house.png";
import { Link, useNavigate } from "react-router-dom";
import { postRequest, patchRequest } from "../Helpers";
import useCookie from "../Hooks/cookie";
import AddressForm from "../components/Addressform";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";

export default function Login() {
  const { setCookie } = useCookie();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, setUpdateStatus, logout, login } = useContext(ProfileContext);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    address: "",
    location: { type: "Point", coordinates: [0, 0] },
    gender: "",
    occupation: "",
    accountType: "",
    dob: "1995-08-15",
    profilepic: "https://example.com/profile.jpg",
  });

  console.log("formData", formData);

  const [resendTimer, setResendTimer] = useState(0);
  const RESEND_COOLDOWN = 60;

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Called whenever the user selects a location
  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      ...data,
    });
  };
  // --- Step 1: Phone Submit ---
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return setError("Please enter your mobile number");
    if (!/^[0-9]{10}$/.test(phone))
      return setError("Enter a valid 10-digit number");
    try {
      setLoading(true);
      const res = await postRequest({
        url: `auth/registerOrLogin`,
        cred: { phone },
      });
      console.log("phone number is:", res?.data?.data);
      if (res?.status) {
        setFormData({ ...formData, phone });
        setIsNewUser(res?.data?.data?.isNew);
        console.log("new", res?.data?.data?.isNew);
        setResendTimer(RESEND_COOLDOWN);
        setStep(2);
        toast.success(res?.data?.message);

        if (res?.data?.data?.otp) {
          setGeneratedOtp(res?.data?.data?.otp);
          console.log("Generated OTP:", res?.data?.data?.otp);
        }
      } else {
        setError(res?.message);
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);

      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: OTP Verify ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return setError("Enter OTP");

    try {
      setLoading(true);
      const res = await postRequest({
        url: `auth/verifyOtp`,
        cred: { phone, otp },
      });
      console.log("OTP Verify Response:", res?.data?.data);
      if (res?.data?.success && res?.data?.statusCode === 200) {
        setError("");
        const token = res?.data?.data?.authToken;
        //const userId = res?.data?.data?._id;
        const userData = res?.data?.data;
        if (isNewUser) {
          setToken(token);
          setUserId(userData?._id);
          console.log("New User -> Token:", token, "UserId:", userId);
          setStep(3);
        } else {
          login(token, userData);
          console.log("Token saved in cookie");
          navigate("/");
        }
        toast.success(res?.data?.message);
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP Function ---
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await postRequest({
        url: `auth/resendOtp`,
        cred: { phone },
      });
      if (res?.status) {
        if (res?.data?.data?.otp) {
          setGeneratedOtp(res?.data?.data?.otp);
          console.log("Resent OTP:", res?.data?.data?.otp);
        }
        setError("");
        toast.success(res?.data?.message);
        setResendTimer(RESEND_COOLDOWN);
      } else {
        setError(res?.message);
      }
    } catch (err) {
      console.error("Resend OTP API Error:", err);
      toast.error(err?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Step 3: Signup/Login Submit ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("userId", userId);

      const res = await patchRequest({
        url: `auth/update/${userId}`,
        cred: { ...formData },
      });
      console.log("signup response:", res?.data?.data);
      setUpdateStatus((prev) => !prev);
      const userData = res?.data?.data;
      console.log("userData", userData);

      login(token, userData);
      console.log("Token saved for new user:=====================>", token);
      toast.success(res?.data?.message);
      navigate("/");
    } catch (err) {
      toast.error(err?.res?.data?.message);
      console.error("Update User API Error:", err);
      setError("API Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postRequest({
        url: `auth/loginWithPassword`,
        cred: {
          phone: formData?.phone,
          password: formData?.password,
        },
      });
      console.log("Login Response:", res?.data?.data);
      setUpdateStatus((prev) => !prev);
      if (res?.data?.success && res?.data?.statusCode === 200) {
        const token = res?.data?.data?.authToken;
        const userData = res?.data?.data;
        login(token, userData);
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.error("Login API Error:", err);
    } finally {
      setLoading(false);
    }
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
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            )}

            <div className="text-center mb-6">
              <h5 className="text-xl font-semibold text-gray-800">
                {step === 1 && "Signup / Login"}
                {step === 2 && "Verify OTP"}
                {step === 3 && (isNewUser ? "Sign Up" : "Login")}
              </h5>
            </div>
            {/* Step 1: Phone Input */}
            {step === 1 && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
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
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 ${
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
                  className="w-full bg-[#005697] text-white py-2 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Get OTP
                </button>

                <div className="flex justify-end">
                  <Link
                    to="#"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsNewUser(false);
                      setStep(3);
                    }}
                  >
                    Login with password
                  </Link>
                </div>
              </form>
            )}
            {/* Step 2: OTP Input */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
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
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter OTP"
                    maxLength={4}
                  />
                </div>
                {generatedOtp && (
                  <p className="text-green-600 text-sm text-center">
                    OTP: <strong>{generatedOtp}</strong>
                  </p>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#005697] text-white py-2 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Signup{" "}
                </button>
                <p className="text-sm text-gray-600 text-center">
                  {resendTimer > 0 ? (
                    <>
                      Resend OTP in : 00:
                      {resendTimer.toString().padStart(2, "0")}
                    </>
                  ) : (
                    <>
                      Didn’t receive code?{" "}
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}

            {/* Step 3: Signup/Login Form */}
            {step === 3 && (
              <form
                onSubmit={isNewUser ? handleFormSubmit : handleLoginSubmit}
                className="space-y-4"
              >
                {/* New User Signup Form */}
                {isNewUser && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {/* First Name */}
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-gray-700 font-medium"
                        >
                          Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter first name"
                            value={formData?.name}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData?.email}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Phone Input (common for both) */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-gray-700 font-medium"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData?.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      inputMode="numeric"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                {/* Password Input (only for login) */}
                {!isNewUser && (
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Password
                    </label>

                    <div className="relative">
                      {/* Lock Icon (left) */}
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                      {/* Input Field */}
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={formData?.password}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 pl-10 pr-10 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        required
                      />

                      {/* Eye Icon (right) */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Occupation */}
                {isNewUser && (
                  <div className="relative">
                    <label
                      htmlFor="occupation"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Occupation
                    </label>
                    <div className="relative">
                      <Luggage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="occupation"
                        type="text"
                        name="occupation"
                        placeholder="Enter your service or occupation"
                        value={formData?.occupation}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Gender */}
                {isNewUser && (
                  <div className="mb-4">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData?.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}

                {/* Account Type */}
                {isNewUser && (
                  <div className="mb-4">
                    <p className="mb-2 text-gray-700 font-medium">
                      Account Type
                    </p>
                    <div className="flex gap-6">
                      {["Buyer", "Seller"].map((type) => (
                        <label
                          key={type}
                          className="relative flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="accountType"
                            value={type}
                            checked={formData?.accountType === type}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center">
                            {formData?.accountType === type && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <span className="ml-3 text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Address */}
                {isNewUser && (
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Address
                    </label>
                    <div className="relative">
                      {/* <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                      <AddressForm
                        value={formData?.data?.address}
                        onSelect={handleLocationSelect}
                      />
                    </div>
                  </div>
                )}

                {/* Terms & Conditions */}
                {isNewUser && (
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
                )}

                <button
                  type="submit"
                  className="w-full bg-[#005697] text-white py-2 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {isNewUser ? "Create Account" : "Login"}
                </button>

                {/* Back button only for Login */}
                {!isNewUser && (
                  <div className="flex justify-start mt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Back
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
