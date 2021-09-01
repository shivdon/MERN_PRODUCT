import axios from "axios";

export const saveProductToDatabase = async (values) =>
  await axios.post(`${process.env.REACT_APP_API}/merchant/product`, values);

export const getSingleProduct = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/users/product/${id}`);

export const listAllProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/users/products`);
