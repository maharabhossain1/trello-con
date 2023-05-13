"use client";

import { createContext, useEffect, useMemo, useState } from "react";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");
  const [apiToken, setToken] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    const getApiKey = sessionStorage.getItem("apiKey");
    const getApiToken = sessionStorage.getItem("apiToken");
    const getOrganizationId = sessionStorage.getItem("organizationId");

    setApiKey(getApiKey);
    setToken(getApiToken);
    setOrganizationId(getOrganizationId);
  }, []);

  const contextValue = useMemo(() => {
    return {
      apiKey,
      setApiKey,
      apiToken,
      setToken,
      organizationId,
      setOrganizationId,
    };
  }, [apiKey, apiToken, organizationId]);

  return (
    <UtilityContext.Provider value={contextValue}>
      {children}
    </UtilityContext.Provider>
  );
};
