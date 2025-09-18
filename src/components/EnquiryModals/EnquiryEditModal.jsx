import { Modal, Button, Select } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { putRequest } from "../../Helpers";
import { ProfileContext } from "../../context/ProfileContext";

const { Option } = Select;

// 🔹 Enum-like object
const STATUS_ENUM = {
  NEW: "new",
  VIEWED: "viewed",
  CONTACTED: "contacted",
  CLOSED: "closed",
};

const EnquiryEditModal = ({ openModal, modalData, setModal }) => {
  const { user } = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    notes: "",
    status: STATUS_ENUM.NEW,
  });

  // 🔹 Auto set data when modalData changes
  useEffect(() => {
    if (modalData) {
      setFormData({
        notes: modalData?.notes || "",
        status: modalData?.status || STATUS_ENUM.NEW,
      });
    }
  }, [modalData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("User not found!");

    try {
      const res = await putRequest({
        url: `enquiry?addedBy=${user._id}`,
        cred: {
          notes: formData.notes,
          status: formData.status,
        },
      });
      toast.success(res?.data?.message || "Updated successfully!");
      setModal(false);
      setFormData({
        notes: "",
        status: STATUS_ENUM.NEW,
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Modal
      title="Edit Enquiry"
      open={openModal}
      onCancel={() => setModal(false)}
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🔹 Dropdown with enum values */}
        <Select
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full"
          size="large"
        >
          {Object.values(STATUS_ENUM).map((status) => (
            <Option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Option>
          ))}
        </Select>

        <textarea
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Your notes"
          className="w-full mt-3 text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-xl"
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EnquiryEditModal;
