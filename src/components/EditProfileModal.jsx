/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { fileUpload, patchRequest } from "../Helpers";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import useCookie from "../Hooks/cookie";
import AddressForm from "../components/Addressform";
import { formatDateCreatedAt } from "../Utils";

export default function EditProfileModal({
  show,
  onClose,
  onSave,
  userProfile,
  setUpdate,
}) {
  const { user, setUser } = useContext(ProfileContext);
  const [formData, setFormData] = useState(
    user
      ? { ...user, dob: formatDateCreatedAt(user?.dob) }
      : {
          dob: "",
          profilepic: "",
          name: "",
          phone: "",
          email: "",
          gender: "",
          accountType: "",
          occupation: "",
          address: "",
        }
  );

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        dob: formatDateCreatedAt(user?.dob),
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [profileImageError, setProfileImageError] = useState("");
  const { setCookie } = useCookie();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!show || !formData) return null;

  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.profilepic) {
      setProfileImageError("Profile image is required");
      return;
    }

    setProfileImageError("");
    setLoading(true);
    patchRequest({
      url: `auth/update/${user?._id}`,
      cred: formData,
    })
      .then((res) => {
        toast.success(res?.data?.message);
        setUser(res?.data?.data);
        if (res?.data?.token) {
          setCookie("token-bridge-house", res?.data?.token, 30);
        }
        setUpdate((prev) => !prev);
        onSave?.(res?.data?.data);
        onClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);

    fileUpload({
      url: "upload/uploadImage",
      cred: { file },
    })
      .then((res) => {
        const imageUrl = res.data?.data?.imageUrl;
        setFormData((prev) => ({
          ...prev,
          profilepic: imageUrl,
        }));
        setImageUploading(false);
        toast.success("Profile image uploaded successfully");
      })
      .catch(() => {
        toast.error("Profile upload failed");
        setImageUploading(false);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ overflow: "hidden" }}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl sm:max-w-xl md:max-w-2xl relative flex flex-col
                   max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 sm:p-8 border-b">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Profile
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 sm:px-8 py-4 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Occupation</label>
                <input
                  name="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter your occupation"
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">E-mail</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Address</label>
                <div className="h-12">
                  <AddressForm
                    value={user?.address}
                    onSelect={handleLocationSelect}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender + Account Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-gray-700 font-medium">Account Type</p>
                <div className="flex items-center gap-6">
                  {["Buyer", "Seller"].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="accountType"
                        value={type}
                        checked={formData.accountType === type}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center">
                        {formData.accountType === type && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="ml-3 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="mb-2 font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e);
                  setProfileImageError("");
                }}
                className="w-full"
              />
              {imageUploading ? (
                <p className="text-blue-500 mt-2 text-sm">Uploading...</p>
              ) : (
                formData.profilepic && (
                  <div className="mt-2 relative w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      src={formData.profilepic}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, profilepic: "" }))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )
              )}
              {profileImageError && (
                <p className="text-red-500 text-sm mt-1">{profileImageError}</p>
              )}
            </div>

            {/* Buttons inside form (scroll with content) */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end sm:items-center mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 w-full sm:w-auto rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || imageUploading}
                className={`px-8 py-3 w-full sm:w-auto rounded-lg font-semibold transition ${
                  loading
                    ? "bg-[#004f8a] cursor-not-allowed text-white"
                    : "bg-[#004f8a] hover:bg-[#003b66] text-white"
                }`}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
