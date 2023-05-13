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

export const getBoards = (id, apiKey, apiToken) =>
  api.get(`/organizations/${id}/boards?key=${apiKey}&token=${apiToken}`);

export const getBoardDetails = (id, apiKey, apiToken) =>
  api.get(`boards/${id}?key=${apiKey}&token=${apiToken}`);

export const updateBoardDetails = (id, apiKey, apiToken, data) =>
  api.put(`boards/${id}?key=${apiKey}&token=${apiToken}`, data);

export const deleteBoardDetails = (id, apiKey, apiToken) =>
  api.delete(`boards/${id}?key=${apiKey}&token=${apiToken}`);
