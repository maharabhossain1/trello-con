"use client";

import { getBoards } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import React, { useState } from "react";

const AllBoardsPage = () => {
  const { apiKey, apiToken, organizationId } = useUtility();
  console.log(apiKey);
  const [boards, setBoards] = useState([]);

  //   const getData = async ()=>{
  //     try{
  //         const res = await getBoards()
  //     }
  //   }

  return <div>AllBoardPage</div>;
};

export default AllBoardsPage;
