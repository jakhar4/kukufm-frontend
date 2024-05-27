import React from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({ rating }) => {
  return (
    <div className="reviews">
      {Array(5)
        .fill()
        .map((_, i) => (
          <FaStar key={i} color={i < rating ? "#f9d71c" : "#dcdcdc"} />
        ))}
    </div>
  );
};

export default Stars;
