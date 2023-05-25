"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { createList, getBoardLists } from "@/api/apiService";

import Button from "@/components/Button";
import Form from "@/components/Form";
import ListCard from "@/components/ListCard";
import Modal from "@/components/Modal";
import useUtility from "@/hooks/useUtilityContext";
import PrivateRoute from "@/components/PrivateRoute";

const BoardDetails = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [allLists, setAllLists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newListData, setNewListData] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoardLists(params.boardId, apiKey, apiToken);
        setAllLists(res.data);
      } catch (e) {
        console.log("Error", e);
      }
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.boardId, apiKey, apiToken, reload]);

  const closeModal = () => {
    setModalIsOpen(false);
    setNewListData({});
  };

  const handleSubmit = async () => {
    try {
      const res = await createList(
        newListData.name,
        params.boardId,
        apiKey,
        apiToken
      );
      if (res.status === 200) {
        setReload(!reload);
        setNewListData({});
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-gray-700 ">All Lists</h1>
      <div className="grid grid-cols-4 gap-4 my-6">
        {allLists.map((list, index) => {
          return (
            <Link
              href={`/boards/${params.boardId}/${list.id}`}
              key={list.id}
              className="col-span-1"
            >
              <ListCard name={list.name} />
            </Link>
          );
        })}
        <div className="col-span-1">
          <Button onClick={setModalIsOpen}> Create List</Button>
        </div>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <Form
            data={newListData}
            setData={setNewListData}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default PrivateRoute(BoardDetails);
