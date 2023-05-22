"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
const PrivateRoute = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    let getApiKey;
    let getApiToken;
    let getOrganizationId;

    if (typeof window !== "undefined") {
      getApiKey = sessionStorage.getItem("apiKey");
      getApiToken = sessionStorage.getItem("apiToken");
      getOrganizationId = sessionStorage.getItem("organizationId");
    }

    useEffect(() => {
      if (!getApiKey || !getApiToken || !getOrganizationId) {
        router.push("/login");
      }
    }, [router, getApiKey, getApiToken, getOrganizationId]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default PrivateRoute;
