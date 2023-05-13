"use client";

import { UtilityContext } from "@/contexts/utilityContext";
import { useContext } from "react";

const useUtility = () => useContext(UtilityContext);

export default useUtility;
