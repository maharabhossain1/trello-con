"use client";

import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from "@/api/apiService";
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
  const [newData, setNewData] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  const getData = async () => {
    try {
      const res = await getBoards(organizationId, apiKey, apiToken);
      setBoards(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (organizationId && apiKey && apiToken) {
      getData();
    }
  }, [organizationId, apiKey, apiToken, reload]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteBoard(id, apiKey, apiToken);
      if (res.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpdate = (data) => {
    setNewData(data ?? {});
    setModalIsOpen(true);
  };

  const confirmUpdate = async (id) => {
    try {
      const res = await updateBoard(id, apiKey, apiToken, newData);
      if (res.status === 200) {
        setReload(!reload);
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCreateBoard = async () => {
    try {
      const res = await createBoard(newData.name, apiKey, apiToken);
      if (res.status === 200) {
        setReload(!reload);
        closeModal();
        setIsCreating(false);
      }
    } catch (e) {
      console.log("error", error);
    }
  };

  const handleDetails = (id) => {
    router.push(`/boards/${id}`);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-700 ">All Boards </h1>
      <div className="flex items-center justify-between">
        <div>
          <p>This page serves as a centralized hub for managing your boards.</p>
        </div>
        <div>
          <button
            onClick={() => {
              setModalIsOpen(true);
              setIsCreating(true);
            }}
            className="flex px-3 py-2 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200"
          >
            <div className="w-6 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <p className="mx-2">Create</p>
          </button>
        </div>
      </div>
      <div className="p-6 my-6 bg-white border border-gray-200 shadow-lg rounded-3xl">
        {boards.map((board) => (
          <Boards
            board={board}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleDetails={handleDetails}
            key={board.id}
          />
        ))}

        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <BoardForm
              data={newData}
              setData={setNewData}
              handleSubmit={isCreating ? handleCreateBoard : confirmUpdate}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AllBoardsPage;
