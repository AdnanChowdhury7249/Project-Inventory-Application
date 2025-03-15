import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemForm = ({ initialData = { name: "", description: "" }, onSubmit }) => {
  const { id: categoryId } = useParams();
  const [itemData, setItemData] = useState(initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData.name || initialData.description) {
      setItemData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ ...itemData, categoryId });
    } catch (error) {
      setError("Failed to save item");
      console.error("Error adding/updating item", error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={itemData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="p-2 border border-gray-300 rounded"
        />

        <textarea
          name="description"
          value={itemData.description}
          onChange={handleChange}
          placeholder="Item Description"
          required
          className="p-2 border border-gray-300 rounded w-full h-32 resize-none"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer">
          {initialData.name ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
