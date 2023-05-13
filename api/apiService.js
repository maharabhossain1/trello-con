import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

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

export const getOrganization = () =>
  api.get(
    `/organizations/645e00ec3736f0e953a46e50?key=${apiKey}&token=${apiToken}`
  );

export const getMe = () =>
  api.get(`/members/me?key=${apiKey}&token=${apiToken}`);

export const getBoards = () =>
  api.get(`/organizations/{id}/boards?key=${apiKey}&token=${apiToken}`);
