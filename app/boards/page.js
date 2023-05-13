"use client";

import { deleteBoard, getBoards } from "@/api/apiService";
import Boards from "@/components/Boards";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

const AllBoardsPage = () => {
  const { apiKey, apiToken, organizationId } = useUtility();
  const [boards, setBoards] = useState([]);
  const [reload, setReload] = useState(false);

  const getData = async () => {
    try {
      const res = await getBoards(organizationId, apiKey, apiToken);
      setBoards(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBoard(id, apiKey, apiToken);
      if (res.status === 200) setReload(!reload);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if ((organizationId, apiKey, apiToken)) getData();
  }, [organizationId, apiKey, apiToken, reload]);

  return (
    <div className="p-4">
      AllBoardPage
      <div className="w-2/5">
        {boards.map((board) => {
          return (
            <Boards
              name={board.name}
              id={board.id}
              handleDelete={handleDelete}
              key={board.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllBoardsPage;
