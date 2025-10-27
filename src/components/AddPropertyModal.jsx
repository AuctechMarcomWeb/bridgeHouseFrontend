/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import { fileUpload, getRequest, postRequest, putRequest } from "../Helpers";
import Addressform from "./Addressform";
import { X } from "lucide-react";
import { Select } from "antd";

const AddPropertyModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  setPropertyStatus,
  show,
  onClose,
}) => {
  const { user, setUser, setUpdateStatus } = useContext(ProfileContext);

  console.log("modalData===", modalData);
  const [type, setType] = useState([]);
  const [bhk, setBhk] = useState([]);
  const [services, setServices] = useState([]);
  const [facilites, setFacilites] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]);
  // const [errors,setErrors]=useState("")

  const [formData, setFormData] = useState(
    modalData
      ? { ...modalData }
      : {
          address: "",
          addedBy: user?._id,
          name: "",
          propertyType: "",
          documents: [],
          description: "",
          propertyDetails: {
            area: "",
            bedrooms: "",
            bathrooms: "",
            floors: "",
            facing: "",
            builtYear: "",
          },
          status: "Available",
          isVerified: false,
          isAdopted: false,
          actualPrice: "",
          sellingPrice: "",
          facilities: [],
          services: [],
          nearby: [],
          gallery: [],
          propertyCode: "",
          bhk: "",
        }
  );

  console.log("formData===>", formData);

  useEffect(() => {
    getRequest(`category?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("Category", responseData);
        setType(responseData?.categories);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`bhk?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("bhk", responseData);
        setBhk(responseData?.bhks);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`facilites?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("facilites", responseData);
        setFacilites(responseData?.facilities);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`service?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("service", responseData);
        setServices(responseData?.services);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`documents?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("documents", responseData);
        setDocuments(responseData?.documents);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const typeOption = type?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });
  const bhkOption = bhk?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });
  const documentsOption = documents?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });

  const [loading, setLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [facilityInput, setFacilityInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [nearbyName, setNearbyName] = useState("");
  const [nearbyDistance, setNearbyDistance] = useState("");
  const [docName, setDocName] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [addedBy, setAddBy] = useState(null);
  const galleryInputRefs = React.useRef([]);
  const documentInputRefs = React.useRef([]);

  React.useEffect(() => {
    if (user?._id) {
      setAddBy(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (modalData) {
      setFormData({
        ...modalData,
      });
    }
  }, [modalData]);

  // ✅ Reset + Close
  const handleCancel = () => {
    setFormData({
      address: "",
      location: {
        type: "Point",
        coordinates: [],
      },
      addedBy: user?._id,
      name: "",
      propertyType: "",
      documents: [],
      description: "",
      propertyDetails: {
        area: "",
        bedrooms: "",
        bathrooms: "",
        floors: "",
        facing: "",
        builtYear: "",
      },
      status: "Available",
      approvalStatus: "Published",
      isVerified: false,
      isAdopted: false,
      actualPrice: "",
      sellingPrice: "",
      facilities: [],
      services: [],
      nearby: [],
      gallery: [],
      propertyCode: "",
      bhk: "",
    });

    setModalData(null);
    setIsModalOpen(false);
  };
  //Location
  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      address: data?.address,
      location: data?.location, // coordinates
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.nested) {
      const nestedKey = dataset.nested; // e.g., "propertyDetails"

      setFormData((prev) => {
        const updatedNested = {
          ...prev[nestedKey],
          [name]: type === "checkbox" ? checked : value,
        };

        // ✅ Auto-calculate area if length or width changed
        if (name === "length" || name === "width") {
          const length =
            parseFloat(name === "length" ? value : prev[nestedKey].length) || 0;
          const width =
            parseFloat(name === "width" ? value : prev[nestedKey].width) || 0;
          updatedNested.area = length * width;
        }

        return {
          ...prev,
          [nestedKey]: updatedNested,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

const handleChangeImage = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  files.forEach((file) => {
    fileUpload({ url: "upload/uploadImage", cred: { file } })
      .then((res) => {
        const uploadedUrl = res?.data?.data?.imageUrl;
        if (uploadedUrl) {
          setFormData((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), uploadedUrl],
          }));
        }
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      });
  });

  // Reset file input so user can re-upload same files
  if (galleryInputRefs.current[0]) {
    galleryInputRefs.current[0].value = "";
  }
};


  // Helper function to generate random code
  const generatePropertyCode = () => {
    const prefix = "PROP"; // aap chahe to customize kar sakte ho
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    return `${prefix}-${randomNum}`;
  };

  // useEffect to set property code on modal open
  useEffect(() => {
    if (!modalData) {
      setFormData((prev) => ({
        ...prev,
        propertyCode: generatePropertyCode(),
      }));
    }
  }, [modalData]);

  const isFieldRequired = (field) => {
    if (formData.propertyType === "Commercial") {
      if (field === "bhk" || field === "bedrooms") return false;
    }
    if (formData.propertyType === "Apartment") {
      if (field === "floors" || field === "length" || field === "width")
        return false;
    }
    return true; // default required
  };

  //  Validate form
  // const validateForm = () => {
  //   let newErrors = {};

  //   if (!formData.name.trim()) newErrors.name = "Property name is required";
  //   if (!formData.address.trim()) newErrors.address = "Address is required";
  //   if (!formData.propertyType.trim())
  //     newErrors.propertyType = "Property type is required";
  //   if (!formData.actualPrice || formData.actualPrice <= 0)
  //     newErrors.actualPrice = "Valid actual price is required";
  //   if (!formData.sellingPrice || formData.sellingPrice <= 0)
  //     newErrors.sellingPrice = "Valid selling price is required";
  //   if (!formData.description.trim())
  //     newErrors.description = "Description is required";
  //   if (!formData.propertyCode.trim())
  //     newErrors.propertyCode = "Property code is required";

  //   //  Plot logic: Agar plot hai to skip detailed fields
  //   if (formData.propertyType !== "Plot") {
  //     if (!formData.propertyDetails.area) newErrors.area = "Area is required";
  //     if (!formData.propertyDetails.bedrooms)
  //       newErrors.bedrooms = "Bedrooms required";
  //     if (!formData.propertyDetails.bathrooms)
  //       newErrors.bathrooms = "Bathrooms required";
  //     if (!formData.propertyDetails.floors)
  //       newErrors.floors = "Floors required";
  //     if (!formData.propertyDetails.builtYear)
  //       newErrors.builtYear = "Built year required";
  //     if (!formData.bhk) newErrors.bhk = "BHK is required";
  //     if (!formData.facilities?.length)
  //       newErrors.facilities = "Select at least 1 facility";
  //     if (!formData.services?.length)
  //       newErrors.services = "Select at least 1 service";
  //   }

  //   // Validation
  //   const validateForm = () => {
  //     let newErrors = {};
  //     if (!formData.name.trim()) newErrors.name = "Property name is required";
  //     if (!formData.address.trim()) newErrors.address = "Address is required";
  //     if (!formData.propertyType.trim())
  //       newErrors.propertyType = "Property type is required";
  //     if (!formData.actualPrice || formData.actualPrice <= 0)
  //       newErrors.actualPrice = "Valid actual price required";
  //     if (!formData.sellingPrice || formData.sellingPrice <= 0)
  //       newErrors.sellingPrice = "Valid selling price required";
  //     if (!formData.description.trim())
  //       newErrors.description = "Description is required";
  //     if (!formData.propertyCode.trim())
  //       newErrors.propertyCode = "Property code is required";

  //     // Conditional Validation
  //     if (
  //       formData.propertyType === "Apartment" ||
  //       formData.propertyType === "Residential"
  //     ) {
  //       if (!formData.propertyDetails.bedrooms)
  //         newErrors.bedrooms = "Bedrooms required";
  //       if (!formData.propertyDetails.bathrooms)
  //         newErrors.bathrooms = "Bathrooms required";
  //       if (!formData.propertyDetails.floors)
  //         newErrors.floors = "Floors required";
  //       if (!formData.propertyDetails.builtYear)
  //         newErrors.builtYear = "Built year required";
  //       if (!formData.bhk) newErrors.bhk = "BHK is required";
  //       if (!formData.facilities?.length)
  //         newErrors.facilities = "Select at least 1 facility";
  //       if (!formData.services?.length)
  //         newErrors.services = "Select at least 1 service";
  //     }

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const validateForm = () => {
    let newErrors = {};
    const details = formData.propertyDetails || {};

    if (!formData.name.trim()) newErrors.name = "Property name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.propertyType.trim())
      newErrors.propertyType = "Property type is required";
    if (!formData.actualPrice || formData.actualPrice <= 0)
      newErrors.actualPrice = "Valid actual price is required";
    if (!formData.sellingPrice || formData.sellingPrice <= 0)
      newErrors.sellingPrice = "Valid selling price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.propertyCode.trim())
      newErrors.propertyCode = "Property code is required";

    if (formData.propertyType !== "Plot") {
      if (isFieldRequired("area") && !details.area)
        newErrors.area = "Area is required";
      if (isFieldRequired("bedrooms") && !details.bedrooms)
        newErrors.bedrooms = "Bedrooms required";
      if (isFieldRequired("bathrooms") && !details.bathrooms)
        newErrors.bathrooms = "Bathrooms required";
      if (isFieldRequired("floors") && !details.floors)
        newErrors.floors = "Floors required";
      if (isFieldRequired("builtYear")) {
        if (!details.builtYear) {
          newErrors.builtYear = "Built year required";
        } else if (details.builtYear < 1900) {
          newErrors.builtYear = "Built year cannot be less than 1900";
        }
      }

      if (isFieldRequired("bhk") && !formData.bhk)
        newErrors.bhk = "BHK is required";
      // if (isFieldRequired("facilities") && !formData.facilities?.length)
      //   newErrors.facilities = "Select at least 1 facility";
      // if (isFieldRequired("services") && !formData.services?.length)
      //   newErrors.services = "Select at least 1 service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // nearBY

  const handleNearByChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFacilities = [...formData.nearby];

    if (name.includes("Name")) {
      updatedFacilities[index].name = value;
    } else if (name.includes("Distance")) {
      updatedFacilities[index].distance = value;
    }

    setFormData((prev) => ({
      ...prev,
      nearby: updatedFacilities,
    }));
  };

  const addNearBy = () => {
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, { name: "", distance: "" }],
    }));
  };

  const removeNearBy = (index) => {
    const updatedFacilities = formData.nearby.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      nearby: updatedFacilities,
    }));
  };

  // document

  const handleDocumentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDocuments = [...formData.documents];

    if (name.includes("Name")) {
      updatedDocuments[index].name = value;
    } else if (name.includes("Number")) {
      updatedDocuments[index].number = value;
    }

    setFormData((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));
  };

  const handleDocumentImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Upload to server
    fileUpload({
      url: `upload/uploadImage`,
      cred: { file },
    })
      .then((res) => {
        const uploadedUrl = res.data?.data?.imageUrl;
        const updatedDocuments = [...formData.documents];
        updatedDocuments[index].image = uploadedUrl;

        setFormData((prev) => ({
          ...prev,
          documents: updatedDocuments,
        }));
      })
      .catch((error) => {
        console.error("Document image upload failed:", error);
      });
  };

  const removeDocumentImage = (index) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].image = "";
    setFormData((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));

    if (documentInputRefs.current[index]) {
      documentInputRefs.current[index].value = ""; // reset input field
    }
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { name: "", number: "", image: "" }],
    }));
  };

  const removeDocument = (index) => {
    const updatedFacilities = formData.documents.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      documents: updatedFacilities,
    }));
  };
  // 🔹 Submit handler for edit
  const handleEdit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    putRequest({ url: `properties/${modalData?._id}`, cred: formData })
      .then((res) => {
        toast.success(res?.data?.message || "Property updated successfully");
        setUpdateStatus((prev) => !prev);
        setPropertyStatus((prev) => !prev);
        handleCancel();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.message || "Update failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 🔹 Submit handler for create
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    postRequest({ url: `properties`, cred: formData })
      .then((res) => {
        toast.success(res?.data?.message || "Property added successfully");
        setUpdateStatus((prev) => !prev);
        setPropertyStatus((prev) => !prev);
        handleCancel();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.message || "Creation failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      title={modalData ? `Edit Property` : `Add Property`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      width={1000}
      style={{ top: 20 }}
    >
      <div
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          paddingRight: "50px",
          marginBottom: "50px",
        }}
      >
        <form
          onSubmit={modalData ? handleEdit : handleSubmit}
          className="needs-validation"
        >
          <div className="row">
            <div className="container">
              <div className="grid grid-cols-2 gap-4">
                {/* Property Code */}
                <div>
                  <label className="form-label fw-bold">Property Code *</label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors?.propertyCode ? "is-invalid" : ""
                    }`}
                    name="propertyCode"
                    value={formData?.propertyCode || ""}
                    required
                    onChange={handleChange}
                    placeholder="Enter unique property code"
                  />
                  {errors?.propertyCode && (
                    <div className="invalid-feedback">
                      {errors.propertyCode}
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="form-label fw-bold">Property Type *</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="propertyType"
                    value={formData?.propertyType || ""}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Property Type</option>
                    {typeOption}
                  </select>
                </div>

                {/* Property Name */}
                <div>
                  <label className="form-label fw-bold">Property Name *</label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors?.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    required
                    value={formData?.name || ""}
                    onChange={handleChange}
                    placeholder="Enter property name (e.g., Luxury Villa)"
                  />
                  {errors?.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Actual Price */}
                <div>
                  <label className="form-label fw-bold">
                    Actual Price (₹) *
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="actualPrice"
                    value={formData?.actualPrice || ""}
                    required
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                {/* Selling Price */}
                <div>
                  <label className="form-label fw-bold">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="sellingPrice"
                    value={formData?.sellingPrice || ""}
                    required
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Address */}
                  <div>
                    <label className="form-label fw-bold">Address *</label>
                    <Addressform
                      className="w-full !p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      value={formData?.address || modalData?.address}
                      onSelect={handleLocationSelect}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="form-label fw-bold">Description *</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="description"
                    rows={3}
                    required
                    value={formData?.description || ""}
                    onChange={handleChange}
                    placeholder="Enter property description"
                  />
                </div>
              </div>
            </div>

            {/* =================== */}

            <hr className="m-0 p-0 my-3" />

            <div className="mb-6">
              <label className="form-label fw-bold">Property Details</label>

              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Dimensions */}
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Length */}
                    <div>
                      <label className="form-label fw-bold">
                        Length (ft)
                        {isFieldRequired("length") ? ` *` : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="length"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.length || ""}
                        onChange={handleChange}
                        placeholder="Enter Length"
                        required={isFieldRequired("length")}
                      />
                    </div>

                    {/* Width */}
                    <div>
                      <label className="form-label fw-bold">
                        Width (ft)
                        {isFieldRequired("width") ? ` *` : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="width"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.width || ""}
                        onChange={handleChange}
                        placeholder="Enter Width"
                        required={isFieldRequired("width")}
                      />
                    </div>
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="form-label fw-bold">Area(sqft) *</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="area"
                    data-nested="propertyDetails"
                    value={formData?.propertyDetails?.area || ""}
                    onChange={handleChange}
                    placeholder="Enter area (e.g., 1200 sqft)"
                    required
                  />
                </div>

                {formData.propertyType !== "Plot" && (
                  <>
                    {/* Bedrooms */}

                    <div
                      className={` ${
                        formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                    >
                      <label className="form-label fw-bold">
                        Bedrooms{" "}
                        {isFieldRequired("bedrooms") ? "*" : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="bedrooms"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.bedrooms || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of bedrooms"
                        required={isFieldRequired("bedrooms")}
                        min={1}
                      />
                    </div>

                    {/* Bathrooms */}
                    <div
                      className={`  ${
                        formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                    >
                      <label className="form-label fw-bold">Bathrooms *</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="bathrooms"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.bathrooms || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of bathrooms"
                        required
                        min={1}
                      />
                    </div>

                    {/* Floors */}
                    <div
                      className={` ${
                        formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                    >
                      <label className="form-label fw-bold">
                        Floors
                        {isFieldRequired("floors") ? ` *` : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="floors"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.floors || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of floors"
                        required={isFieldRequired("floors")}
                        min={1}
                      />
                    </div>
                  </>
                )}

                {/* Facing */}
                <div>
                  <label className="form-label fw-bold">Facing *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="facing"
                    data-nested="propertyDetails"
                    value={formData?.propertyDetails?.facing || ""}
                    onChange={handleChange}
                    placeholder="Enter facing direction"
                    required
                  />
                </div>

                {formData.propertyType !== "Plot" && (
                  <>
                    {/* Built Year */}
                    <div
                      className={`space-y-3 ${
                        formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                    >
                      <label className="form-label fw-bold">Built Year *</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="builtYear"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.builtYear || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={handleChange}
                        placeholder="Enter year built"
                        required
                        min={1900}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <hr className="m-0 p-0 my-3" />

            {/* ======================= */}

            <div className="grid grid-cols-2 gap-4">
              {formData.propertyType !== "Plot" && (
                <>
                  {/* Facilities */}
                  <div
                    className={`${
                      formData?.propertyType === "Plot" ? "opacity-40" : ""
                    }`}
                  >
                    <label className="form-label fw-bold">Facilities </label>
                    <Select
                      value={formData?.facilities}
                      mode="tags"
                      size="large"
                      style={{ width: "100%" }}
                      required
                      placeholder="Enter/Select Your Facilities"
                      disabled={formData?.propertyType === "Plot"}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          facilities: value,
                        });
                      }}
                      options={facilites?.map((service) => ({
                        label: service?.name,
                        value: service?.name,
                      }))}
                    />
                  </div>

                  {/* Services */}
                  <div
                    className={`${
                      formData?.propertyType === "Plot" ? "opacity-40" : ""
                    }`}
                  >
                    <label className="form-label fw-bold">Services </label>
                    <Select
                      value={formData?.services}
                      mode="tags"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Enter/Select Your Services"
                      required
                      disabled={formData?.propertyType === "Plot"}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          services: value,
                        });
                      }}
                      options={services?.map((service) => ({
                        label: service?.name,
                        value: service?.name,
                      }))}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {formData.propertyType !== "Plot" && (
                <>
                  {/*BHK*/}
                  <div
                    className={`space-y-3 ${
                      formData?.propertyType === "Plot" ? "opacity-40" : ""
                    }`}
                  >
                    <label className="form-label fw-bold">
                      BHK
                      {isFieldRequired("bhk") ? ` *` : "(Optional)"}
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      name="bhk"
                      value={formData?.bhk || ""}
                      required={isFieldRequired("bhk")}
                      onChange={handleChange}
                      disabled={formData?.propertyType === "Plot"}
                    >
                      <option value="">Select BHK</option>
                      {bhkOption}
                    </select>
                  </div>
                </>
              )}
              {/* Property Images Upload */}
              <div>
                <label className="form-label fw-bold">Property Images *</label>

                {/* Native file input */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  ref={(el) => (galleryInputRefs.current[0] = el)}
                  onChange={handleChangeImage}
                  required={!(formData?.gallery?.length > 0)}
                />

                {/* Gallery Preview */}
                {formData?.gallery?.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {formData.gallery.map((item, index) => (
                      <div key={index} className="relative inline-block">
                        <img
                          src={item}
                          alt={`gallery-${index}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => {
                              const newGallery = prev.gallery.filter(
                                (_, i) => i !== index
                              );

                              // Reset input only if last image removed
                              if (
                                newGallery.length === 0 &&
                                galleryInputRefs.current
                              ) {
                                galleryInputRefs.current.value = "";
                              }

                              return { ...prev, gallery: newGallery };
                            });
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <hr className="m-0 p-0 my-3" />

            {/* Nearby */}
            <div className="col-span-2">
              <label className="form-label font-bold">Nearby</label>

              {formData?.nearby?.map((facility, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 border p-4 rounded mb-2 items-end"
                >
                  {/* Name */}
                  <div>
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name={`facilityName_${index}`}
                      value={facility?.name || ""}
                      onChange={(e) => handleNearByChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter nearby name"
                      required
                    />
                  </div>

                  {/* Distance / Description */}
                  <div>
                    <label className="form-label">Distance *</label>
                    <input
                      type="number"
                      name={`facilityDistance_${index}`}
                      value={facility?.distance || ""}
                      onChange={(e) => handleNearByChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter distance"
                      required
                    />
                  </div>

                  {/* Remove Button */}
                  {formData?.nearby?.length > 1 && (
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all"
                        onClick={() => removeNearBy(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <div className="col-span-2 mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-all"
                  onClick={addNearBy}
                >
                  Add More
                </button>
              </div>
            </div>

            <hr className="m-0 p-0 my-3" />
            {/* Documents */}
            <div className="col-span-2">
              <label className="form-label font-bold">Documents</label>

              {formData?.documents?.map((doc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 border p-4 rounded mb-2 items-end"
                >
                  {/* Document Name */}
                  <div>
                    <label className="form-label">Document Name *</label>
                    <select
                      name={`documentName_${index}`}
                      value={doc?.name}
                      onChange={(e) => handleDocumentChange(e, index)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select Document</option>
                      {documentsOption}
                    </select>
                  </div>

                  {/* Document Number */}
                  <div>
                    <label className="form-label">Document Number *</label>
                    <input
                      type="text"
                      name={`documentNumber_${index}`}
                      value={doc?.number || ""}
                      onChange={(e) => handleDocumentChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter document number"
                      required
                    />
                  </div>

                  {/* Document Image Upload */}
                  <div>
                    <label className="form-label">Document Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      onChange={(e) => handleDocumentImageChange(e, index)}
                      required
                      ref={(el) => (documentInputRefs.current[index] = el)}
                    />
                  </div>

                  {/* Image Preview with Remove */}
                  <div>
                    {doc?.image && (
                      <div className="relative inline-block mt-2">
                        <img
                          src={doc.image}
                          alt={`doc-${index}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeDocumentImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Remove Document Button */}
                  {formData?.documents?.length > 1 && (
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all"
                        onClick={() => removeDocument(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <div className="col-span-2 mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-all"
                  onClick={addDocument}
                >
                  Add More
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white transition-all ${
                loading
                  ? "bg-[#004f8a] cursor-not-allowed"
                  : "bg-[#004f8a] hover:bg-[#004f8a]"
              }`}
            >
              {loading
                ? "Saving..."
                : modalData
                ? "Update Property"
                : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPropertyModal;
