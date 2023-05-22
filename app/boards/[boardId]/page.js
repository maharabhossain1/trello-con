"use client";
import { getBoardDetails, getBoardLists } from "@/api/apiService";
import ListCard from "@/components/ListCard";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const BoardDetails = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoardLists(params.boardId, apiKey, apiToken);
        setDetails(res.data);
      } catch (e) {}
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.boardId, apiKey, apiToken]);
  console.log("details", details);
  return (
    <div>
      BoardDetails
      <div>
        <ListCard />
      </div>
    </div>
  );
};

export default BoardDetails;
