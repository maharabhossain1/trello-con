"use client";
import { getBoardDetails } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const BoardDetails = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoardDetails(params.boardId, apiKey, apiToken);
        setDetails(res.data);
      } catch (e) {}
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.boardId, apiKey, apiToken]);

  return (
    <div>
      BoardDetails
      <div>
        <p>{details.name}</p>
      </div>
    </div>
  );
};

export default BoardDetails;
