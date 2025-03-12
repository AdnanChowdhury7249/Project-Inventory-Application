import { useState } from "react";
import { addItem } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const ItemForm = () => {
  const { id: categoryId } = useParams();
  const [itemData, setItemData] = useState({ name: "", description: "" })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(categoryId, itemData)
      navigate(-1);
    } catch (error) {
      setError("failed to add item")
      console.error("error adding item", error)
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text"
          name="name"
          value={itemData.name}
          onChange={handleChange}
          placeholder="item name"
          required
          className="p-2 border border-gray-300 rounded"
        />

        <input type="text"
          name="description"
          value={itemData.description}
          onChange={handleChange}
          placeholder="item description"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button className="bg-blue-500 text-white py-2 rounded cursor-pointer" type="submit">Add Item</button>
      </form>
    </div >
  )
}

export default ItemForm
