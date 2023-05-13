import useUtility from "@/hooks/useUtilityContext";
import React from "react";

const Test = () => {
  const { apiKey } = useUtility();
  console.log(apiKey);
  return <div>test</div>;
};

export default Test;
