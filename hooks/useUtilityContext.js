"use client";

import { UtilityContext } from "@/contexts/utilityContext";
import { useContext } from "react";

const useUtility = () => {
  const utilityContext = useContext(UtilityContext);
  return utilityContext;
};

export default useUtility;
