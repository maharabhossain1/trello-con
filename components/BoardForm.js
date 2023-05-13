import React, { useState } from "react";

const BoardForm = ({ title, handleSubmit, data, setData }) => {
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full p-6"
      >
        <div>
          <p>{title}</p>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={data?.name}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="Board Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="desc"
            value={data?.decs}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="Board Description"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
