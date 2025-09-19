import { postRequest } from "../Helpers";

export const handlePayment = async ({ total, selectedPlan }) => {
  try {

    //  create order from backend=================================
    
    const { data } = postRequest("/create-order", {
      amount: total,
    });

    // Step 2: Razorpay options

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "bridgeHouse",
      description: selectedPlan?.name,
      handler: async function (response) {
        
        // Step 3: Backend me verify karo

         postRequest ("/appointment/payment", response);
        alert("Payment Successful");
      },
      prefill: {
        name: data.name,
        email: data.email ,
        contact: data.phone,
      },
      theme: { color: "#667eea" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.error("Payment Failed", err);
  }
};
