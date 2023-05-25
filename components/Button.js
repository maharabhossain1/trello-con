import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="flex items-center w-full p-6 bg-gray-200 border border-gray-200 shadow-lg rounded-3xl hover:shadow-xl"
    >
      <div className="w-8 mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      {children}
    </button>
  );
};

export default Button;
