import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Select,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { getRequest } from "../Helpers";
import BridgeHousepayment from "./bridgeHousepayment";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const UpgradeModal = ({ open, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

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
      width="90%"
      style={{ maxWidth: 700 }}
      centered
    >
      {/* 🔹 Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "24px",
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
      <div style={{ padding: "24px" }}>
        <Title level={4}>Select Your Plan</Title>

        {/* Plan + Quantity + Price */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#f9f9ff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
        >
          <Row gutter={[16, 16]}>
            {/* Plan Dropdown */}
            <Col xs={24} sm={12}>
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
            </Col>

            {/* Quantity Dropdown */}
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block", marginBottom: "6px" }}>
                Quantity
              </Text>
              <Select
                value={quantity}
                onChange={(val) => setQuantity(val)}
                style={{ width: "100%" }}
                size="large"
              >
                {[...Array(10)].map((_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Price */}
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block", marginBottom: "6px" }}>
                Price
              </Text>
              <Text
                strong
                style={{
                  fontSize: "18px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{(selectedPlan ? selectedPlan.price * quantity : 0).toFixed(2)}
              </Text>
            </Col>
          </Row>
         </div>

        {/* Summary Section */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          {/* Subtotal */}
          <p style={{ fontSize: "16px", margin: "6px 0", display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal</span>
            <strong>₹{subtotal.toFixed(2)}</strong>
          </p>

          {/* Tax */}
          <p style={{ fontSize: "16px", margin: "6px 0", display: "flex", justifyContent: "space-between" }}>
            <span>Tax (18%)</span>
            <strong>₹{tax.toFixed(2)}</strong>
          </p>

          {/* Payment Method */}
          <p style={{ fontSize: "18px", margin: "6px 0", display: "flex", justifyContent: "space-between" }}>
            <span>Payment Method</span>
            <strong style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Online Payment</strong>
          </p>

          <Divider style={{ margin: "15px 0" }} />

          {/* Total Paid */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "6px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total Paid</span>
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


        {/* 🔹 Pay Now Button */}
        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {console.log("===============") ,setShowPayment(true)} }// Razorpay open karega
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

      {/* Razorpay Payment Trigger */}
      {showPayment && (
        <BridgeHousepayment
        open={open}
          total={total}
          selectedPlan={selectedPlan}
          onClose={() => setShowPayment(false)}
        />
      )}
    </Modal>
  );
};

export default UpgradeModal;


UpgradeModal.js