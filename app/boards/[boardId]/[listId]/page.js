"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { createCard, getCards } from "@/api/apiService";
import Button from "@/components/Button";
import Form from "@/components/Form";
import ListCard from "@/components/ListCard";
import Modal from "@/components/Modal";
import useUtility from "@/hooks/useUtilityContext";

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
    setNewListData({});
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
          {allCards.map((card) => {
            return (
              <Link
                href={`/boards/${params.boardId}/${params.listId}/${card.id}`}
                key={card.id}
                className="col-span-1"
              >
                <ListCard name={card.name} />
              </Link>
            );
          })}
          <div className="col-span-1">
            <Button onClick={setModalIsOpen}> Create List</Button>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <Form
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
