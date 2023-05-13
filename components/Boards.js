import React from "react";

const Boards = ({ name, id, handleDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 my-3 border border-gray-400 rounded-lg">
      <div>{name}</div>
      <div>
        <button className="px-4 py-3 mx-2 text-white transition-all duration-200 bg-blue-500 hover:bg-blue-600 rounded-xl">
          Update
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="px-4 py-3 text-white transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Boards;