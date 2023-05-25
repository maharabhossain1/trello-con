"use client";
import { createList, getBoardLists } from "@/api/apiService";
import ListCard from "@/components/ListCard";
import Modal from "@/components/Modal";
import useUtility from "@/hooks/useUtilityContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListForm = ({ data, setData, handleSubmit }) => {
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full p-6"
    >
      <div className="mb-6">
        <p>Create New List </p>
      </div>
      <div>
        <input
          type="text"
          name="name"
          value={data?.name ? data.name : ""}
          onChange={handleOnChange}
          className="w-full px-4 py-2 mb-4 text-black border rounded-md"
          placeholder="Board Name"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

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
        closeModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      BoardDetails
      <div className="grid grid-cols-4 gap-4">
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
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center w-full p-6 bg-gray-200 border border-gray-200 shadow-lg rounded-3xl hover:shadow-xl"
          >
            <div className="w-8 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <p>Create List</p>
          </button>
        </div>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <ListForm
            data={newListData}
            setData={setNewListData}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default BoardDetails;
