import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
const EnquiryViewModal = ({openModal,modalData,setModal}) => {
    const handleCancel = ()=>{
        setModal(false)
    }

   
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property: "",
  });

  // 🔹 Auto set data when modalData comes
  useEffect(() => {
    if (modalData) {
      setFormData({
        name: modalData?.name || "",
        email: modalData?.email || "",
        phone: modalData?.phone || "",
        message: modalData?.message || "",
        property: modalData?.propertyId || "",
      });
    }
  }, [modalData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest({ url: `enquiry`, cred: formData })
      .then((res) => {
        console.log("Enquiry Form", res?.data);
        toast.success(res?.data?.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          property: "",
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.response?.data?.message);
      });
  };
    

  return (
    <>
       <Modal
        title="ViewDetail Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openModal}
        onCancel={handleCancel}
         footer={null}
      >

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          name="phone"
          type="tel"
          value={formData?.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <textarea
          name="message"
          rows="4"
          value={formData?.message}
          onChange={handleChange}
          placeholder="Your Message"
          
          className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
      </form>
        
      </Modal>
    </>
  );
};

export default EnquiryViewModal;