"use client";

import { getMe } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const { setApiKey, setToken, setOrganizationId } = useUtility();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    apiKey: "",
    apiToken: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { apiKey, apiToken } = formValues;

    try {
      const response = await getMe(apiKey, apiToken);
      const organizationId = response?.data?.idOrganizations?.[0];
      if (organizationId) {
        setApiKey(apiKey);
        setToken(apiToken);
        setOrganizationId(organizationId);
        sessionStorage.setItem("organizationId", organizationId);
        sessionStorage.setItem("apiKey", apiKey);
        sessionStorage.setItem("apiToken", apiToken);

        router.push("/");
      } else {
        console.error("Error creating organization: No organization ID found.");
      }
    } catch (error) {
      console.error("Error creating organization:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-1/2 h-screen m-auto ">
      <form
        onSubmit={handleSubmit}
        className="w-full p-12 bg-white border border-gray-200 shadow-xl rounded-3xl"
      >
        <div className="w-full mb-6 text-center">
          <p className="text-2xl font-bold text-gray-700">
            Welcome to Trello Clone
          </p>
          <p className="w-10/12 m-auto mt-2 mb-12 text-sm">
            Enter your Trello API key and token to login and start using our
            app.
          </p>
        </div>
        <div>
          <input
            type="text"
            name="apiKey"
            value={formValues.apiKey}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-xl"
            placeholder="API Key"
          />
        </div>
        <div>
          <input
            type="text"
            name="apiToken"
            value={formValues.apiToken}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-xl"
            placeholder="API Token"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-all delay-100 bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
