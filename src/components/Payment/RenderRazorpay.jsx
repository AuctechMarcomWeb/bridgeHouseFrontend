import { useContext, useEffect, useRef } from "react";
import { postRequest } from "../../Helpers";
import toast from "react-hot-toast";
import { ProfileContext } from "../../context/ProfileContext";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Error loading Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({ orderId, currency, amount, onClose }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const { setUser, setUpdateStatus } = useContext(ProfileContext);

  const displayRazorpay = async (options) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const rzp1 = new window.Razorpay(options);

    // When payment fails
    rzp1.on("payment.failed", async (response) => {
      paymentId.current = response.error.metadata.payment_id;
      console.error("Payment Failed:", response.error);
      try {
        await postRequest({
          url: "payment/failed",
          cred: {
            status: "Failed",
            paymentId: paymentId.current,
            reason: response.error.description,
          },
        });
        toast.error("Payment Failed!");
      } catch (error) {
        console.error("Payment Failed API Error:", error);
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
      console.log("✅ Payment Success Response:", response);

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;

      // ✅ Close parent modal after slight delay
      setTimeout(() => {
        if (typeof onClose === "function") onClose();
      }, 200);

      try {
        const res = await postRequest({
          url: "payment/verify",
          cred: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
        });

        if (res?.data?.success && res?.data?.data?.user) {
          toast.success("Payment Verified Successfully!");
          setUser(res.data.data.user);
          setUpdateStatus((prev) => !prev);
        } else {
          toast.error("Payment Verification Failed!");
        }
      } catch (error) {
        console.error("Verify API Error:", error);
        toast.error("Error verifying payment. Please try again.");
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: (reason) => {
        console.warn("Payment modal closed:", reason);

        //Show user feedback
        toast("Payment cancelled", {
          icon: "⚠️",
          duration: 3000,
        });

        //  Also close UpgradeModal if needed
        if (typeof onClose === "function") onClose();
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
