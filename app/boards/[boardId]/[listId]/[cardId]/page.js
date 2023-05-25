"use client";

import { getCardDetails } from "@/api/apiService";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const CardDetails = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCardDetails(params.cardId, apiKey, apiToken);
        setCardDetails(res.data);
      } catch (e) {}
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.cardId, apiKey, apiToken]);

  console.log("data", cardDetails);
  return <div>CardDetails</div>;
};

export default CardDetails;
