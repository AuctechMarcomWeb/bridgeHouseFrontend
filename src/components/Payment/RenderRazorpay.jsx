import { useEffect, useRef } from "react";
import { postRequest } from "../../Helpers";
import toast from "react-hot-toast";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({ orderId, currency, amount }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const displayRazorpay = async (options) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on("payment.failed", async (response) => {
      paymentId.current = response.error.metadata.payment_id;
      console.error("Payment Failed:", response.error);

      try {
        const res = await postRequest({
          url: "payment/failed",
          cred: {
            status: "Failed",
            paymentId: paymentId.current,
            reason: response.error.description,
          },
        });

        console.log("Payment Failed API Response:", res?.data);

        if (res?.data?.success) {
          toast.success("Payment status updated as Failed!");
        } else {
          toast.error("Payment Failed API call did not succeed.");
        }
      } catch (error) {
        console.error("Payment Failed API Error:", error);
        toast.error("Error while notifying backend about failed payment.");
      }
    });

    rzp1.open();
  };

  const options = {
    key: "rzp_test_wHiuJBhFZCkHSf",
    amount,
    currency,
    name: "Bridge House",
    order_id: orderId,

    handler: async (response) => {
      console.log("Payment Success Response:", response);

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

      try {
        const res = await postRequest({
          url: "payment/verify",
          cred: {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
        });

        console.log("Verify API Success:", res?.data);

        if (res?.data?.success) {
          toast.success("Payment Verified Successfully!");
        } else {
          toast.error("Payment Verification Failed!");
        }
      } catch (error) {
        console.error("Verify API Error:", error);
        toast.error(" Error verifying payment. Please try again.");
      }
    },

    modal: {
      confirm_close: true,
      ondismiss: (reason) => {
        console.warn("Payment modal closed:", reason);
      },
    },

    retry: { enabled: false },
    timeout: 900,
    theme: { color: "#667eea" },
  };

  useEffect(() => {
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;
