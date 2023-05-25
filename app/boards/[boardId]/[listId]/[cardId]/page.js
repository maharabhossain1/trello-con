"use client";

import { getCardDetails } from "@/api/apiService";
import PrivateRoute from "@/components/PrivateRoute";
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 ">Card Details</h1>
      <p>name :{cardDetails.name}</p>
      <p>Description :{cardDetails.desc}</p>
    </div>
  );
};

export default PrivateRoute(CardDetails);
