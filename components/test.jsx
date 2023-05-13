import useUtility from "@/hooks/useUtilityContext";
import React from "react";

const Test = () => {
  const { apiKey } = useUtility();

  return <div>test</div>;
};

export default Test;
