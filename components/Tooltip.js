import React, { useState } from "react";
import { motion } from "framer-motion";

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -16 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-800 text-xs text-white p-4 rounded-md absolute z-10 bottom-full min-w-max"
        >
          <div className="w-4 h-4 bg-neutral-800 absolute top-full left-1/2 transform -translate-y-3 -translate-x-[4.2rem] rotate-45" />
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
