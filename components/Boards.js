import React from "react";

const Boards = ({ handleDelete, handleUpdate, board, handleDetails }) => {
  return (
    <div className="flex items-center justify-between p-4 my-3 bg-white border border-gray-200 rounded-3xl">
      <div className="text-gray-800">{board.name}</div>
      <div className="flex items-center">
        <button
          onClick={() => handleDetails(board.id)}
          className="px-4 py-2 text-white transition-all duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
        >
          Details
        </button>
        <button
          onClick={() => handleUpdate(board)}
          className="px-4 py-2 mx-2 text-white transition-all duration-200 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(board.id)}
          className="px-4 py-2 text-white transition-all duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Boards;
