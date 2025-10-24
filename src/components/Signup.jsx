import React, { useState } from "react";
import logo from "../assets/bridge-house.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOtpStep) {
      // --- STEP 1: PHONE VALIDATION ---
      if (!phone) {
        setError("Please enter your mobile number");
        return;
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }

      // Generate OTP
      const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otpValue);
      console.log("Generated OTP:", otpValue);

      setIsOtpStep(true);
      setError("");
    } else {
      // --- STEP 2: OTP VALIDATION ---
      if (!otp) {
        setError("Please enter the OTP");
        return;
      }
      if (otp !== generatedOtp) {
        setError("Invalid OTP, please try again.");
        return;
      }

      console.log("OTP Verified Successfully");
      setError("");
       const isNewUser = true; 

      navigate("/login", { state: { phone, isNewUser } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="bg-[#005697] p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="hidden md:block relative z-10">
            <div className="flex items-center justify-center mb-8 ">
              <div
                onClick={() => navigate("/")}
                className="w-30 rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <h2 className="md:text-3xl text-xl font-bold mb-6 leading-tight">
              Find Your Dream Home Today
            </h2>

            <p className="2xl:text-lg text-base text-blue-100 mb-8 leading-relaxed">
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
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-sm rounded-2xl p-6">
            <div className="text-center mb-6">
              <h5 className="text-xl font-semibold text-gray-800">
                {isOtpStep ? "Verify OTP" : "Signup / Login"}
              </h5>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isOtpStep ? (
                // --- Phone Input ---
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number  <span className="text-red-500">*</span>
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
              ) : (
                // --- OTP Input ---
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
                    className={`mt-2 block w-full rounded-lg border px-3 py-2 ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>
              )}

              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isOtpStep ? "Sign Up" : "Get OTP"}
                </button>
              </div>

              {/* Conditional Links - button ke niche */}
              <div className="text-center mt-3">
                {isOtpStep ? (
                  // Sirf OTP step ke liye
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
                ) : (
                  // Sirf phone step ke liye
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                     onClick={() =>
                      navigate("/login", { state: { isNewUser: false } })
                    }
                  >
                    Login with password
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
