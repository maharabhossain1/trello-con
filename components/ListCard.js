import React from "react";

const ListCard = ({ name }) => {
  return (
    <div className="w-full p-6 py-10 bg-white border border-gray-200 shadow-lg rounded-3xl hover:shadow-xl">
      {name}
    </div>
  );
};

export default ListCard;
