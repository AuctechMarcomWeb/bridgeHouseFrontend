/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import { fileUpload, postRequest, putRequest } from "../Helpers";
import Addressform from "./Addressform";
import { X } from "lucide-react";
import { Select } from "antd";

const AddPropertyModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setUpdateStatus,
  show,
  onClose,
}) => {
  const { user } = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    addedBy: user?._id,
    name: "",
    propertyType: "",
    actualPrice: "",
    sellingPrice: "",
    description: "",
    facilities: [],
    services: [],
    address: "",
    location: { type: "Point", coordinates: [0, 0] },
    nearby: [{ name: "", distance: "" }],
    documents: [{ name: "", number: "", image: "" }],
    gallery: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const facilitiesOptions = ["Parking", "Lift", "Power Backup"];
  const servicesOptions = ["Water Supply", "Maintenance"];

  // ✅ Prefill when editing
  useEffect(() => {
    if (modalData) {
      setFormData({
        addedBy: modalData?.addedBy || user?._id,
        name: modalData?.name || "",
        propertyType: modalData?.propertyType || "",
        actualPrice: modalData?.actualPrice || "",
        sellingPrice: modalData?.sellingPrice || "",
        description: modalData?.description || "",
        facilities: modalData?.facilities || [],
        services: modalData?.services || [],
        address: modalData?.address || "",
        location: modalData?.location || { type: "Point", coordinates: [0, 0] },
        nearby: modalData?.nearby?.length
          ? modalData?.nearby
          : [{ name: "", distance: "" }],
        documents: modalData?.documents?.length
          ? modalData?.documents
          : [{ name: "", number: "", image: "" }],
        gallery: modalData?.gallery || [],
      });

      // ✅ Sync selects separately
      setSelectedFacilities(modalData.facilities || []);
      setSelectedServices(modalData.services || []);
    }
  }, [modalData, user]);

  // ✅ Reset + Close
  const handleCancel = () => {
    setFormData({
      addedBy: user?._id,
      name: "",
      propertyType: "",
      actualPrice: "",
      sellingPrice: "",
      description: "",
      facilities: [],
      services: [],
      address: "",
      location: { type: "Point", coordinates: [0, 0] },
      nearby: [{ name: "", distance: "" }],
      documents: [{ name: "", number: "", image: "" }],
      gallery: [],
    });
    setErrors({});
    setIsModalOpen(false);
  };
  //Location
  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      address: data?.address, // cleaned formatted address
      location: data?.location, // coordinates
    });
  };
  // ✅ Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add Nearby
  const addNearby = () => {
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, { name: "", distance: "" }],
    }));
  };

  const removeNearby = (index) => {
    const updatedNearby = [...formData.nearby];
    updatedNearby.splice(index, 1);
    setFormData((prev) => ({ ...prev, nearby: updatedNearby }));
  };

  const handleNearbyChange = (index, field, value) => {
    const updatedNearby = [...formData.nearby];
    updatedNearby[index][field] = value;
    setFormData((prev) => ({ ...prev, nearby: updatedNearby }));
  };

  const handleFacilitiesChange = (values) => {
    setSelectedFacilities(values);
    setFormData((prev) => ({ ...prev, facilities: values }));
  };

  const handleServicesChange = (values) => {
    setSelectedServices(values);
    setFormData((prev) => ({ ...prev, services: values }));
  };

  // ✅ Image Upload for Gallery
  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) =>
        fileUpload({
          url: `upload/uploadImage`,
          cred: { file },
        }).then((res) => res.data?.data?.imageUrl)
      )
    )
      .then((uploadedUrls) => {
        setFormData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...uploadedUrls],
        }));
        console.log("Uploaded images: ", uploadedUrls);
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      });
  };
  // Remove Image Handler
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };
  // ✅ Document Upload
  const handleDocumentImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    fileUpload({
      url: `upload/uploadImage`,
      cred: { file },
    })
      .then((res) => {
        const imageUrl = res.data?.data?.imageUrl;
        setFormData((prev) => {
          const updatedDocs = [...prev.documents];
          updatedDocs[index].image = imageUrl;
          return { ...prev, documents: updatedDocs };
        });
      })
      .catch((error) => {
        console.error("Document image upload failed:", error);
      });
  };

  const handleDocumentChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedDocs = [...prev.documents];
      updatedDocs[index][field] = value;
      return { ...prev, documents: updatedDocs };
    });
  };

  const handleRemoveDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Property name is required";
    if (!formData.propertyType.trim())
      newErrors.propertyType = "Property type is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit - Add
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) return;

    postRequest({ url: `properties`, cred: formData })
      .then((res) => {
        console.log("add property", res?.data?.data);
        toast.success(res?.data?.message);
        setUpdateStatus((prev) => !prev);
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ✅ Submit - Edit
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) return;

    putRequest({ url: `properties/${modalData?._id}`, cred: formData })
      .then((res) => {
        console.log("update property", res?.data?.data);
        toast.success(res?.data?.message);
        setUpdateStatus((prev) => !prev);
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title={modalData ? "Edit Property" : "Add Property"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <hr className="my-2 py-2" />
      <form
        onSubmit={modalData ? handleEdit : handleSubmit}
        className="space-y-6"
        noValidate
      >
        {/* Property Title */}
        <div>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            placeholder="Enter property title"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
          {errors.name && (
            <div className="text-red-500 mt-1">{errors.name}</div>
          )}
        </div>

        {/* Property Type */}
        <div>
          <select
            name="propertyType"
            value={formData?.propertyType}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          >
            <option value="">Select Property Type</option>
            {["Villa", "Commercial", "Residential", "Plot"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <div className="text-red-500 mt-1">{errors.propertyType}</div>
          )}
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="actualPrice"
            value={formData?.actualPrice}
            onChange={handleInputChange}
            placeholder="Actual Price"
            className="w-full p-4 border border-gray-300 rounded-xl outline-none"
          />
          <input
            type="text"
            name="sellingPrice"
            value={formData?.sellingPrice}
            onChange={handleInputChange}
            placeholder="Selling Price"
            className="w-full p-4 border border-gray-300 rounded-xl outline-none"
          />
        </div>

        {/* Address & Description */}
        <div className="grid grid-cols-2 gap-4">
          <Addressform
            value={formData?.address}
            onSelect={handleLocationSelect}
          />
          <textarea
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows="1"
            className="w-full p-4 border border-gray-300 rounded-xl outline-none"
          />
        </div>

        {/* Nearby Places */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold">Nearby Places</label>
            <button
              type="button"
              onClick={addNearby}
              className="text-blue-600 font-semibold"
            >
              + Add
            </button>
          </div>
          {formData.nearby.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2"
            >
              <input
                type="text"
                placeholder="Name"
                value={item.name}
                onChange={(e) =>
                  handleNearbyChange(index, "name", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-xl outline-none"
              />
              <input
                type="text"
                placeholder="Distance"
                value={item.distance}
                onChange={(e) =>
                  handleNearbyChange(index, "distance", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-xl outline-none"
              />
              <button
                type="button"
                onClick={() => removeNearby(index)}
                className="text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Facilities & Services */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Facilities</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Facilities"
              value={selectedFacilities}
              onChange={handleFacilitiesChange}
            >
              {facilitiesOptions.map((f) => (
                <Select.Option key={f} value={f}>
                  {f}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Services</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Services"
              value={selectedServices}
              onChange={handleServicesChange}
            >
              {servicesOptions.map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block font-semibold mb-2">Images</label>
          <input
            type="file"
            name="gallery"
            multiple
            onChange={handleChangeImage}
            className="mb-2"
          />

          {/* Preview Images */}
          <div className="flex gap-2 overflow-auto">
            {formData?.gallery?.map((imgUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imgUrl}
                  alt={`uploaded-${index}`}
                  className="w-16 h-16 object-cover rounded"
                />
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Documents - single line for image, name, number */}
        <div>
          <label className="block font-semibold mb-2">Documents</label>
          <div className="flex flex-col gap-4">
            {formData?.documents?.map((doc, index) => (
              <div key={index} className=" p-3 rounded-xl flex flex-col gap-2">
                {/* Delete Button */}
                {/* <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1"
                >
                  ✕
                </button> */}
                {/* First Line: Name + Number */}
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    className="w-32"
                    onChange={(e) => handleDocumentImage(e, index)}
                  />
                  {doc.image && (
                    <img
                      src={doc.image}
                      alt={`doc-${index}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>

                {/* Second Line: File Upload + Preview */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Document Name"
                    value={doc.name}
                    onChange={(e) =>
                      handleDocumentChange(index, "name", e.target.value)
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Document Number"
                    value={doc.number}
                    onChange={(e) =>
                      handleDocumentChange(index, "number", e.target.value)
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-white font-semibold transition 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            disabled={loading}
          >
            {loading
              ? modalData
                ? "Updating..."
                : "Saving..."
              : modalData
              ? "Update Property"
              : "Save Property"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPropertyModal;
