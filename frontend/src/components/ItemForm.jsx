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
    <div>
      <h2>Add new Item</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text"
          name="name"
          value={itemData.name}
          onChange={handleChange}
          placeholder="item name"
          required
        />

        <input type="text"
          name="description"
          value={itemData.description}
          onChange={handleChange}
          placeholder="item description"
          required
        />
        <button className="cursor-pointer" type="submit">Add Item</button>
      </form>
    </div>
  )
}

export default ItemForm
