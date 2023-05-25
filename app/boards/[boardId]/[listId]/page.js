"use client";
import { getBoardListDetails } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const SingleList = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [allLists, setAllLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoardListDetails(params.listId, apiKey, apiToken);
        console.log(res);
        setAllLists(res.data);
      } catch (e) {}
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.boardId, apiKey, apiToken]);
  
  console.log("details", allLists);

  return <div>SingleList</div>;
};

export default SingleList;
