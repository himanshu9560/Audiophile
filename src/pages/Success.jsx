import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || null;

  useEffect(() => {
    confetti({
      zIndex: 999,
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">No order found. Redirecting…</p>
      </div>
    );
  }

  const { items, total } = order;

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg w-full bg-white shadow-xl rounded-lg p-6 text-center"
      >
        {/* 🎉 Header */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-green-600 mb-2"
        >
          🎉 Order Placed Successfully!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 mb-6"
        >
          Thank you for your purchase 🎧
        </motion.p>

        {/* 📋 Order Summary */}
        <motion.div
          variants={itemVariants}
          className="text-left space-y-4"
        >
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="divide-y">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${item.price}</p>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between pt-4 border-t font-bold text-lg"
          >
            <span>Total</span>
            <span>${total}</span>
          </motion.div>
        </motion.div>

        {/* 🔙 Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Success;
