import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Space,
  Typography,
  Divider,
  Select,
  InputNumber,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CrownOutlined,
  RocketOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getRequest } from "../Helpers";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const UpgradeModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]); // 🔹 API se plans store karenge
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 🔹 Plans API se fetch karna
  // useEffect(() => {
  //   getRequest(`subscription-packages`)
  //     .then((res) => {
  //       const apiPlans = res?.data?.data.packages || [];
  //       setPlans(apiPlans);
  //       if (apiPlans.length > 0) {
  //         setSelectedPlan(apiPlans[0]); // default pehla plan
  //       }
  //       console.log("Subscription Plans:", apiPlans);
  //     })
  //     .catch((err) => console.log("Api Error", err));
  // }, []);
  useEffect(()=>{
    getRequest(`subscription-packages`)
    .then((res)=>{
       setPlans(res?.data?.data?.packages ||[])
    }).catch((error)=>{
      console.log(error.message)
    })
  })

  // 🔹 Calculation (agar plan select hai to hi chalega)
  const subtotal = selectedPlan ? selectedPlan.price * quantity : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // 🔹 Table Data
  const tableData = selectedPlan
    ? [
        {
          key: selectedPlan._id,
          package: selectedPlan.name,
          quantity,
          price: `${selectedPlan.price*quantity}`,
          tax: `${tax.toFixed(2)}`,
          total: `${total.toFixed(2)}`,
        },
      ]
    : [];

  const columns = [
    { title: "Package", dataIndex: "package", key: "package" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Tax (18%)", dataIndex: "tax", key: "tax" },
    { title: "Total", dataIndex: "total", key: "total" },
  ];

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      {/* Header */}
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

      {/* Body */}
      <div style={{ padding: "32px" }}>
        <Title level={4}>
          <RocketOutlined style={{ color: "#667eea" }} /> Select Your Plan
        </Title>

        {/* 🔹 Plans dropdown (from API) */}
        <Select
          value={selectedPlan?._id}
          onChange={(id) =>
            setSelectedPlan(plans.find((plan) => plan._id === id))
          }
          style={{ width: "100%", marginBottom: "16px" }}
          size="large"
        >
          {plans.map((plan) => (
            <Option key={plan._id} value={plan._id}>
              {plan.name} - {plan.price}
            </Option>
          ))}
        </Select>

        {/* Quantity Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <Button
            icon={<MinusOutlined />}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          />
          <InputNumber
            value={quantity}
            onChange={(value) => setQuantity(value || 1)}
            min={1}
            max={100}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>

        <Divider />

        {/* Pricing Table */}
        <Table
          bordered
          dataSource={tableData}
          columns={columns}
          pagination={false}
        />

        <Divider />

        {/* Footer Buttons */}
        <Space style={{ width: "100%", justifyContent: "center" }}>
        
          <Button
            type="primary"
            size="large"
            onClick={() => {
              onClose();
              navigate("/upgrade", {
                state: {
                  plan: selectedPlan,
                  quantity,
                  subtotal,
                  tax,
                  total,
                },
              });
            }}
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
