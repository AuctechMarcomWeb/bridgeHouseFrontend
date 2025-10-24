import { useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import toast from "react-hot-toast";
import { postRequest } from "../Helpers";
import { X, Eye, EyeOff, Lock } from "lucide-react";
import { validatePassword } from "../Utils";

export default function CreatePasswordModal({ show, onClose, setUpdate }) {
  const { user } = useContext(ProfileContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character"
      );
      return;
    }
    if (!confirmPassword) {
      setError("Password cannot be empty");
      return;
    }

    if (!validatePassword(confirmPassword)) {
      setError(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character"
      );
      return;
    }

    setLoading(true);

    const payload = { phone: user?.phone, password, confirmPassword };

    postRequest({ url: "auth/createPassword", cred: payload })
      .then((res) => {
        console.log("user Create pasword", res?.data?.message);
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setUpdate((prev) => !prev);
          onClose();
        } else {
          setError(res?.data?.message);
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.error("Create Password Error:", err);
        setError(err?.response?.data?.message || "Something went wrong");
        toast.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Create Password
        </h2>
        <hr className="my-2 py-2" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={user?.phone || ""}
              placeholder="Enter phone number"
              disabled
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12 bg-gray-100"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-medium"
            >
              Password
            </label>

            <div className="relative">
              {/* Lock Icon */}
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              {/* Input Field */}
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md border ${
                  error ? "border-red-500" : "border-gray-300"
                } pl-10 pr-10 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
                required
              />

              {/* Show/Hide Eye Icon */}
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

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* confirmPassword */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-gray-700 font-medium"
            >
              Confirm Password
            </label>

            <div className="relative">
              {/* Lock Icon */}
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              {/* Input Field */}
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full rounded-md border ${
                  error ? "border-red-500" : "border-gray-300"
                } pl-10 pr-10 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
                required
              />

              {/* Show/Hide Eye Icon */}
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

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-[#004f8a] cursor-not-allowed"
                  : "bg-[#004f8a] hover:bg-[#004f8a] text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Create Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
