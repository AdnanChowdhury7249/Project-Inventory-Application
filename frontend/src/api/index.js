import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getCategories = () => API.get("/categories");
export const addCategory = (categoryData) => API.post("/categories", categoryData);
export const updateCategory = (id, categoryData) => API.put(`categories/${id}`, categoryData);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

export const getAllItems = () => API.get("/items");
export const getItems = (categoryId) => API.get(`/items/${categoryId}`);
export const addItem = (categoryId, itemData) => API.post(`/items/${categoryId}`, itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);
export const getItemById = (id) => API.get(`/items/category/${id}`);
export const getCategoryById = (categoryId) => API.get(`/categories/${categoryId}`);
