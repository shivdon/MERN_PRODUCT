import axios from "axios";

export const getCurrentUser = async () =>
  await axios.get(`${process.env.REACT_APP_API}/users/currentuser`);

export const registerUser = async (email, password) =>
  await axios.post(`${process.env.REACT_APP_API}/users/signup`, {
    email,
    password,
  });

export const loginUser = async (email, password) =>
  await axios.post(`${process.env.REACT_APP_API}/users/signin`, {
    email,
    password,
  });
