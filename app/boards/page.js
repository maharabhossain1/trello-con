"use client";

import { deleteBoard, getBoards, updateBoard } from "@/api/apiService";
import BoardForm from "@/components/BoardForm";
import Boards from "@/components/Boards";
import Modal from "@/components/Modal";
import useUtility from "@/hooks/useUtilityContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllBoardsPage = () => {
  const router = useRouter();
  const { apiKey, apiToken, organizationId } = useUtility();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [reload, setReload] = useState(false);
  const [updatedBoard, setUpdatedBoard] = useState({});

  const getData = async () => {
    try {
      const res = await getBoards(organizationId, apiKey, apiToken);
      setBoards(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    if ((organizationId, apiKey, apiToken)) getData();
  }, [organizationId, apiKey, apiToken, reload]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteBoard(id, apiKey, apiToken);
      if (res.status === 200) setReload(!reload);
    } catch (e) {
      console.log("error", e);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleUpdate = (data) => {
    setUpdatedBoard(data);
    setModalIsOpen(true);
  };

  const confirmUpdate = async (id) => {
    try {
      const res = await updateBoard(
        updatedBoard.id,
        apiKey,
        apiToken,
        updatedBoard
      );
      if (res.status === 200) {
        setReload(!reload);
        closeModal();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  console.log(boards);
  const handleDetails = (id) => {
    router.push(`/boards/${id}`);
  };
  return (
    <div className="p-4">
      AllBoardPage
      <div className="w-2/5">
        {boards.map((board) => {
          return (
            <Boards
              board={board}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleDetails={handleDetails}
              key={board.id}
            />
          );
        })}

        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <BoardForm
              data={updatedBoard}
              setData={setUpdatedBoard}
              handleSubmit={confirmUpdate}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AllBoardsPage;
