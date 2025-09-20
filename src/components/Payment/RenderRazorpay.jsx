import { useEffect, useRef } from "react";
import { postRequest } from "../../Helpers";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({ orderId, currency, amount }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  let rzp1;

  // To load razorpay checkout modal script.
  const displayRazorpay = async (options) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    rzp1 = new window.Razorpay(options);

    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });

    // To get payment id in case of failed transaction.
    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    // to open razorpay checkout modal.
    rzp1.open();
  };

  // // informing server about payment
  const handlePayment = async (status, orderDetails = {}) => {};

  const options = {
    key: "rzp_test_wHiuJBhFZCkHSf",
    amount,
    currency,
    name: "Bridge House",

    order_id: orderId,

    handler: (response) => {
      rzp1.close();

      console.log("response=================>",response);
      

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;

      console.log(
        "sdfsdfsdfsdf-====",
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
      );

      postRequest({
        url: `payment/verify`,
        cred: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      })
        .then((res) => {
          console.log("res verify ===>", res?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    modal: {
      confirm_close: true,

      ondismiss: async (reason) => {
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {};
        if (reason === undefined) {
          console.log("cancelled", reason);

          handlePayment("Cancelled");
        } else if (reason === "timeout") {
          console.log("timedout", reason);
          handlePayment("timedout");
        } else {
          console.log("failed", reason);
          handlePayment("failed", {
            paymentReason,
            field,
            step,
            code,
          });
        }
      },
    },

    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: "",
    },
  };

  useEffect(() => {
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;
