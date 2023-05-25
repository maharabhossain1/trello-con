import React from "react";

const Form = (props) => {
  const { title, handleSubmit, data, setData } = props;
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
          handleSubmit(data.id);
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
            value={data?.name ? data.name : ""}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="desc"
            value={data?.desc ? data.desc : ""}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="Description"
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

export default Form;
