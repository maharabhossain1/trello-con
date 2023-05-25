"use client";
import { createCard, getCards } from "@/api/apiService";
import ListCard from "@/components/ListCard";
import Modal from "@/components/Modal";
import useUtility from "@/hooks/useUtilityContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CardsForm = ({ data, setData, handleSubmit }) => {
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

const SingleList = ({ params }) => {
  const { apiKey, apiToken } = useUtility();
  const [allCards, setAllCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCardData, setNewCardData] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCards(params.listId, apiKey, apiToken);
        setAllCards(res.data);
      } catch (e) {}
    };

    if ((apiKey, apiToken)) fetchData();
  }, [params.listId, apiKey, apiToken, reload]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await createCard(
        newCardData.name,
        params.listId,
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
      SingleList
      <div>
        <div className="grid grid-cols-4 gap-4">
          {allCards.map((card, index) => {
            return (
              <Link
                href={`/boards/${params.boardId}/${card.id}`}
                key={card.id}
                className="col-span-1"
              >
                <ListCard name={card.name} />
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
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <CardsForm
            data={newCardData}
            setData={setNewCardData}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default SingleList;
