"use client";

import { getBoards } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const AllBoardsPage = () => {
  const { apiKey, apiToken, organizationId } = useUtility();
  const [boards, setBoards] = useState([]);

  const getData = async () => {
    try {
      const res = await getBoards(organizationId, apiKey, apiToken);
      setBoards(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if ((organizationId, apiKey, apiToken)) getData();
  }, [organizationId, apiKey, apiToken]);

  console.log("boards", boards);
  return <div>AllBoardPage</div>;
};

export default AllBoardsPage;
