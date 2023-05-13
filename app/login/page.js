"use client";

import { getMe } from "@/api/apiService";
import React, { useState } from "react";

const Page = () => {
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiToken: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { apiKey, apiToken } = credentials;

    try {
      if ((apiKey && apiToken) !== "") {
        const response = await getMe(apiKey, apiToken);
        console.log("Organization created:", response.data);
      }

      // Handle success or perform any further actions
    } catch (error) {
      console.error("Error creating organization:", error.message);

      // Handle error or display error message
    }
  };

  return (
    <div className="flex items-center justify-center w-2/5 h-screen m-auto ">
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 border border-black rounded-2xl"
      >
        <div>
          <p> Welcome to Trello Clone</p>
        </div>
        <div>
          <input
            type="text"
            name="apiKey"
            value={credentials.apiKey}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="API Key"
          />
        </div>
        <div>
          <input
            type="text"
            name="apiToken"
            value={credentials.apiToken}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="API Token"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
