import axios from "axios";

const api = axios.create({
  baseURL: "https://api.trello.com/1",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle authentication errors
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  }
);

export const getOrganization = (id, apiKey, apiToken) =>
  api.get(`/organizations/${id}?key=${apiKey}&token=${apiToken}`);

export const getMe = (apiKey, apiToken) =>
  api.get(`/members/me?key=${apiKey}&token=${apiToken}`);

// Boards API
export const getBoards = (id, apiKey, apiToken) =>
  api.get(`/organizations/${id}/boards?key=${apiKey}&token=${apiToken}`);

export const getBoardDetails = (id, apiKey, apiToken) =>
  api.get(`/boards/${id}?key=${apiKey}&token=${apiToken}`);

export const updateBoard = (id, apiKey, apiToken, data) =>
  api.put(`/boards/${id}?key=${apiKey}&token=${apiToken}`, data);

export const deleteBoard = (id, apiKey, apiToken) =>
  api.delete(`/boards/${id}?key=${apiKey}&token=${apiToken}`);

export const createBoard = (name, description, apiKey, apiToken) =>
  api.post(
    `/boards/?name=${name}&desc=${description}&key=${apiKey}&token=${apiToken}`
  );

// List API
export const getBoardLists = (id, apiKey, apiToken) =>
  api.get(`/boards/${id}/lists?key=${apiKey}&token=${apiToken}`);

export const createList = (name, boardId, apiKey, apiToken) =>
  api.post(
    `lists?name=${name}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`
  );

export const getBoardListDetails = (id, apiKey, apiToken) =>
  api.get(`/lists/${id}?key=${apiKey}&token=${apiToken}`);

// Cards API
export const getCards = (id, apiKey, apiToken) =>
  api.get(`/lists/${id}/cards?key=${apiKey}&token=${apiToken}`);

export const createCard = (name, description, listId, apiKey, apiToken) =>
  api.post(
    `cards?name=${name}&desc=${description}&idList=${listId}&key=${apiKey}&token=${apiToken}`
  );

export const getCardDetails = (id, apiKey, apiToken) =>
  api.get(`/cards/${id}?key=${apiKey}&token=${apiToken}`);
