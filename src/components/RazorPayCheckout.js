import { useEffect } from "react";

const RazorPayCheckout = ({ orderId, amount, currency, onPaymentSuccess, onClose }) => {
  useEffect(() => {
    if (!orderId) return;

    const options = {
      key: "rzp_test_wHiuJBhFZCkHSf", // Replace with your Razorpay test key
      amount,
      currency,
      order_id: orderId, // 👈 yeh zaroor dena hai
      name: "BridgeHouse",
      description: "Subscription Payment",
      handler: function (response) {
        onPaymentSuccess(response); // ✅ parent me verify call karega
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#667eea" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      onClose();
    });

  }, [orderId]);

  return null; // 👈 ye component sirf popup trigger karega, UI ki zaroorat nahi
};

export default RazorPayCheckout;
