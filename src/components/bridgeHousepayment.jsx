import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { postRequest } from "../Helpers";
import { ProfileContext } from "../context/ProfileContext";
import RazorPayCheckout from "./RazorPayCheckout";

const BridgeHousepayment = ({ open, onClose, total, selectedPlan }) => {
  const { user } = useContext(ProfileContext);

  // Steps
  const [step, setStep] = useState(1);

  // Payment States
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showRazorpay, setShowRazorpay] = useState(false);

  // ✅ Step 1: Create Order
  const createOrder = async () => {
    setLoading(true);
    try {
      const { data } = await postRequest({
        url: `payment/create`,
        cred: {
          userId: user?._id,
          planName: selectedPlan?.name,
          quantity: 1,
          price: total,
          totalAmount: total,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          address: user?.address,
          city: user?.city,
          state: user?.state,
          pincode: user?.pincode,
          country: "India",
          paymentGateway: "razorpay",
          planId: selectedPlan?._id,
        },
      });

      console.log("Order API Response ================:", data);
      setOrderId(data?.data?.razorpayOrderId?.id);
      setStep(2); // Move to Payment Method step
    } catch (err) {
      console.error("Order Create Error :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && open) {
      createOrder();
    }
  }, [user, open]);

  // Step 2: Verify Payment
  const handleVerify = async (response) => {
    console.log("🔄 Payment Response:", response);

    try {
      setPaymentLoading(true);
      const res = await postRequest({
        url: `payment/verify`,
        cred: response,
      });

      console.log("Verify API Response :", res);

      if (res?.data?.success) {
        Modal.success({
          title: "Payment Verified",
          content: "Your payment was successful ",
        });
        setStep(4); // Success screen
      } else {
        Modal.error({
          title: "Payment Failed",
          content: "Verification failed ",
        });
      }
    } catch (err) {
      console.error("Verification Error:", err);
      Modal.error({
        title: "Error",
        content: "Error verifying payment",
      });
    } finally {
      setPaymentLoading(false);
      setShowRazorpay(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedPayment(null);
    setOrderId(null);
    setShowRazorpay(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={500}
    >
      {/* Step 1: Loading Order */}
      {step === 1 && (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-gray-700">
            Creating Order...
          </p>
        </div>
      )}

      {/* Step 2: Choose Payment Method */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold text-center mb-6">
            Choose Payment Method
          </h2>
          <div className="space-y-4">
            <Button
              block
              type={selectedPayment === "online" ? "primary" : "default"}
              onClick={() => setSelectedPayment("online")}
            >
               Pay Online
            </Button>
            <Button
              block
              type={selectedPayment === "offline" ? "primary" : "default"}
              onClick={() => setSelectedPayment("offline")}
            >
              🏢 Pay at Office
            </Button>
          </div>
          <div className="mt-6">
            <Button
              type="primary"
              block
              disabled={!selectedPayment}
              onClick={() => {
                if (selectedPayment === "online") {
                  setShowRazorpay(true);
                } else {
                  setStep(3);
                }
              }}
              loading={loading}
                 paymentLoading={paymentLoading}
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {/* Step 3: Offline Payment Confirmation */}
      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold text-center mb-6">
            Confirm Offline Payment
          </h2>
          <p className="text-center text-gray-600 mb-6">
            You have chosen to pay at the office.
          </p>
          <div className="flex gap-4">
            <Button block onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              block
              onClick={() => setStep(4)}
            >
              Confirm
            </Button>
          </div>
        </>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Payment Successful!
          </h2>
          <p className="text-gray-700 mb-6">
            Your subscription for{" "}
            <strong>{selectedPlan?.name}</strong> has been activated.
          </p>
          <Button type="primary" block onClick={handleClose}>
            Go to Dashboard →
          </Button>
        </div>
      )}

      {/* Razorpay Modal */}
      {showRazorpay && orderId && (
        <RazorPayCheckout
          orderId={orderId}
          amount={total * 100}
          currency="INR"
          onPaymentSuccess={handleVerify}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </Modal>
  );
};

export default BridgeHousepayment;

