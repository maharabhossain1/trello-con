"use client";

import { getMe, getOrganization } from "@/api/apiService";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMe();
        const organizationId = response.data.idOrganizations[0];
        sessionStorage.setItem("organizationId", organizationId);
        setData(organizationId);
      } catch (e) {
        console.log(`${e.message}`);
      }
    }
    fetchData();
  }, []);

  return <main>{data}</main>;
}
