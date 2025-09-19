import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Select, Space, Divider } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { getRequest } from "../Helpers";
import { handlePayment } from "./RazorPayCheckout";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const UpgradeModal = ({ open, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getRequest(`subscription-packages`)
      .then((res) => {
        const apiPlans = res?.data?.data.packages || [];
        setPlans(apiPlans);
        if (apiPlans.length > 0) setSelectedPlan(apiPlans[0]);
      })
      .catch((err) => console.log("Api Error", err));
  }, []);

  const subtotal = selectedPlan ? selectedPlan.price * quantity : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      {/* 🔹 Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "32px",
          textAlign: "center",
          color: "white",
        }}
      >
        <CrownOutlined style={{ fontSize: "40px", color: "#ffd700" }} />
        <Title level={2} style={{ color: "white", margin: "8px 0" }}>
          Upgrade Your Plan
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.9)" }}>
          Your free listing limit is reached. Upgrade now to access unlimited
          opportunities and maximize visibility.
        </Paragraph>
      </div>

      {/* 🔹 Body */}
      <div style={{ padding: "32px" }}>
        <Title level={4}>Select Your Plan</Title>

        {/* Plan + Quantity + Price Row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "12px",
            background: "#f9f9ff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* Plan Dropdown */}
          <div style={{ flex: 1 }}>
            <Text strong style={{ display: "block", marginBottom: "6px" }}>
              Select Plan
            </Text>
            <Select
              value={selectedPlan?._id}
              onChange={(id) =>
                setSelectedPlan(plans.find((plan) => plan._id === id))
              }
              style={{ width: "100%" }}
              size="large"
            >
              {plans.map((plan) => (
                <Option key={plan._id} value={plan._id}>
                  {plan.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Quantity Dropdown */}
          <div>
            <Text strong style={{ display: "block", marginBottom: "6px" }}>
              Quantity
            </Text>
            <Select
              value={quantity}
              onChange={(val) => setQuantity(val)}
              style={{ width: 100 }}
              size="large"
            >
              {[...Array(10)].map((_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </div>

          {/* Price */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong style={{ marginBottom: "6px" }}>
              Price
            </Text>
            <Text
              strong
              style={{
                fontSize: "18px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹{(selectedPlan ? selectedPlan.price * quantity : 0).toFixed(2)}
            </Text>
          </div>
        </div>

        {/* 🔹 Summary Section */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <p style={{ fontSize: "16px", margin: "4px 0" }}>
            Subtotal: <strong>₹{subtotal.toFixed(2)}</strong>
          </p>
          <p style={{ fontSize: "16px", margin: "4px 0" }}>
            Tax (18%): <strong>₹{tax.toFixed(2)}</strong>
          </p>
          <Divider style={{ margin: "8px 0" }} />
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "4px 0",
              color: "#333",
            }}
          >
            Total:{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹{total.toFixed(2)}
            </span>
          </p>
        </div>

        {/* 🔹 Footer Buttons */}
        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => handlePayment({ total, selectedPlan })}
            style={{
              minWidth: "160px",
              height: "48px",
              borderRadius: "8px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
            icon={<CrownOutlined />}
          >
            Pay Now
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
