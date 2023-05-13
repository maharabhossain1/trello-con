"use client";

import { createContext, useMemo, useState } from "react";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("test");
  const [apiToken, setToken] = useState("");
  const [organizationId, setOrganizationId] = useState("");

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
