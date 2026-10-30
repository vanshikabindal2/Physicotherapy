// import React from "react";
// import "./Membership.css";
// import {  FaCrown, FaGem, FaArrowRight } from "react-icons/fa";
// import membership from "../../assets/membership.jpeg";

// const plans = [
//   {
//     name: "Silver",
//     duration: "1 Month",
//     price: 500,
//     discount: "25% OFF",
//     description: "Start your recovery journey",
  
//   },
//   {
//     name: "Diamond",
//     duration: "3 Months",
//     price: 1000,
//     discount: "30% OFF",
//     description: "Advanced care for better results",
   
//   },
//   {
//     name: "Gold",
//     duration: "12 Months",
//     price: 1500,
//     discount: "50% OFF",
//     description: "Premium care for a healthier life",
    
//   },
// ];

// const Membership = () => {
//   const handleChoosePlan = (plan) => {
//     alert(
//       `${plan.name} Membership selected!\nDuration: ${plan.duration}\nPrice: ₹${plan.price}`
//     );
//   };

//   return (
//     <section
//       className="membership-section"
//       style={{ backgroundImage: `url(${membership})` }}
//     >
//       <div className="membership-overlay"></div>

//       <div className="membership-container">
//         <div className="membership-heading">
//           <span className="membership-subtitle">
//             MEMBERSHIP PLANS
//           </span>

//           <h1>Your Journey to Better Health</h1>

//           <p>
//             Choose your perfect plan and take the next step
//             towards a stronger, healthier you.
//           </p>
//         </div>

//         <div className="membership-grid">
//           {plans.map((plan) => (
//             <div
//               className={`membership-card ${plan.name.toLowerCase()}-card`}
//               key={plan.name}
//             >
//               {plan.name === "Diamond" && (
//                 <span className="popular-badge">
//                   <FaCrown /> MOST POPULAR
//                 </span>
//               )}

//               <span className="discount-badge">
//                 {plan.discount}
//               </span>

//               <span className="plan-duration">
//                 {plan.duration}
//               </span>

//               <div className="plan-icon">
//                 {plan.name === "Silver" ? (
//                   "✧"
//                 ) : plan.name === "Diamond" ? (
//                   <FaGem />
//                 ) : (
//                   <FaCrown />
//                 )}
//               </div>

             
//               <h2>{plan.name}</h2>
//               <h3>Membership</h3>

//               <p className="plan-description">
//                 {plan.description}
//               </p>

              
//               <div className="plan-price">
//                 ₹{plan.price.toLocaleString("en-IN")}
//               </div>

//               <p className="price-note">
//                 for {plan.duration}
//               </p>

//               <div className="plan-divider"></div>

              
//               <button
//                 type="button"
//                 className="plan-button"
//                 onClick={() => handleChoosePlan(plan)}
//               >
//                 Choose {plan.name}
//                 <FaArrowRight />
//               </button>
//             </div>
//           ))}
//         </div>

       
//         <div className="membership-footer">
//           <span>♡</span>
//           <p>
//             MOVE BETTER / FEEL STRONGER / LIVE HEALTHIER
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Membership;

import React, { useState } from "react";
import "./Membership.css";
import {
  FaCheck,
  FaCrown,
  FaGem,
  FaArrowRight,
} from "react-icons/fa";
import membership from "../../assets/membership.jpeg";

const plans = [
  {
    name: "Silver",
    planId: "silver",
    duration: "1 Month",
    price: 500,
    discount: "25% OFF",
    description: "Start your recovery journey",
  },
  {
    name: "Diamond",
    planId: "diamond",
    duration: "3 Months",
    price: 1000,
    discount: "30% OFF",
    description: "Advanced care for better results",
  },
  {
    name: "Gold",
    planId: "gold",
    duration: "12 Months",
    price: 1500,
    discount: "50% OFF",
    description: "Premium care for a healthier life",
  },
];

const API_URL = "http://localhost:5000/api/payment";

const Membership = () => {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleChoosePlan = async (plan) => {
    if (loadingPlan) return;

    setLoadingPlan(plan.planId);

    try {
      // Check Razorpay Checkout script
      if (!window.Razorpay) {
        throw new Error(
          "Payment system load nahi hua. Page refresh karein."
        );
      }

      // 1. Create order on backend
      const orderResponse = await fetch(
        `${API_URL}/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: plan.planId,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(
          orderData.message || "Payment order create nahi hua."
        );
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Physiotherapy Center",
        description: `${plan.name} Membership - ${plan.duration}`,
        order_id: orderData.orderId,

        theme: {
          color:
            plan.planId === "silver"
              ? "#88929e"
              : plan.planId === "diamond"
              ? "#5b8def"
              : "#c49a38",
        },

        // 3. Verify payment on backend
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(
              `${API_URL}/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
              }
            );

            const result = await verifyResponse.json();

            if (!verifyResponse.ok || !result.success) {
              alert(
                "Payment verify nahi hua. Support se contact karein."
              );
              return;
            }

            alert(
              `Payment Successful!\n\nMembership: ${plan.name}\nDuration: ${plan.duration}\nAmount: ₹${result.amount}\n\nThank you for choosing us!`
            );
          } catch (error) {
            console.error("Verification error:", error);

            alert(
              "Payment status confirm nahi ho saka. Support se contact karein."
            );
          } finally {
            setLoadingPlan(null);
          }
        },

        modal: {
          ondismiss: () => {
            setLoadingPlan(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);

        alert(
          response.error?.description ||
            "Payment failed. Please try again."
        );

        setLoadingPlan(null);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      alert(
        error.message ||
          "Payment start nahi ho paya. Backend server check karein."
      );

      setLoadingPlan(null);
    }
  };

  return (
    <section
      className="membership-section"
      style={{ backgroundImage: `url(${membership})` }}
    >
      <div className="membership-overlay"></div>

      <div className="membership-container">
        {/* Heading */}
        <div className="membership-heading">
          <span className="membership-subtitle">
            MEMBERSHIP PLANS
          </span>

          <h1>Your Journey to Better Health</h1>

          <p>
            Choose your perfect plan and take the next step
            towards a stronger, healthier you.
          </p>
        </div>

        {/* Membership Cards */}
        <div className="membership-grid">
          {plans.map((plan) => (
            <div
              className={`membership-card ${plan.name.toLowerCase()}-card`}
              key={plan.planId}
            >
              {/* Popular Badge */}
              {plan.name === "Diamond" && (
                <span className="popular-badge">
                  <FaCrown /> MOST POPULAR
                </span>
              )}

              {/* Discount */}
              <span className="discount-badge">
                {plan.discount}
              </span>

              {/* Duration */}
              <span className="plan-duration">
                {plan.duration}
              </span>

              {/* Icon */}
              <div className="plan-icon">
                {plan.name === "Silver" ? (
                  "✧"
                ) : plan.name === "Diamond" ? (
                  <FaGem />
                ) : (
                  <FaCrown />
                )}
              </div>

              {/* Plan Details */}
              <h2>{plan.name}</h2>
              <h3>Membership</h3>

              <p className="plan-description">
                {plan.description}
              </p>

              {/* Price */}
              <div className="plan-price">
                ₹{plan.price.toLocaleString("en-IN")}
              </div>

              <p className="price-note">
                for {plan.duration}
              </p>

              <div className="plan-divider"></div>

              {/* Choose Button */}
              <button
                type="button"
                className="plan-button"
                onClick={() => handleChoosePlan(plan)}
                disabled={loadingPlan !== null}
              >
                {loadingPlan === plan.planId
                  ? "Processing..."
                  : `Choose ${plan.name}`}

                {loadingPlan !== plan.planId && (
                  <FaArrowRight />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="membership-footer">
          <span>♡</span>
          <p>
            MOVE BETTER / FEEL STRONGER / LIVE HEALTHIER
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership;
