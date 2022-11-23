import axios from "axios";

const getItems = () => {
  return axios.get("http://localhost:8000/api/items");
};
const getItemById = (id) => {
  return axios.get("http://localhost:8000/api/items/" + id);
};
const postItem = (data) => {
  return axios.post("http://localhost:8000/api/items", data);
};
const updateItem = (data, id) => {
  return axios.post("http://localhost:8000/api/items/" + id, data);
};
const deleteItem = (id) => {
  axios.delete("http://localhost:8000/api/items/" + id);
};
const getItemsByCategory = (category) => {
  return axios.get(`http://localhost:8000/api/items/category/${category}`);
};
const getItemByKeyword = (keyword) => {
  return axios.get(`http://localhost:8000/api/items/search/${keyword}`);
};

const loginUser = (userCredentials) => {
  return axios.post("http://localhost:8000/api/users/login", userCredentials, {
    withCredentials: true,
  });
};

const getLogged = () => {
  return axios.get("http://localhost:8000/api/users/login", {
    withCredentials: true,
  });
};

const logOut = () => {
  return axios.get("http://localhost:8000/api/users/logout", {
    withCredentials: true,
  });
};

const registerUser = (data) => {
  return axios.post("http://localhost:8000/api/users", data);
};

export default {
  getItems,
  getItemById,
  postItem,
  deleteItem,
  updateItem,
  registerUser,
  loginUser,
  getItemsByCategory,
  getItemByKeyword,
  getLogged,
  logOut,
};
