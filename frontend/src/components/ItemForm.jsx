import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ItemForm = ({ initialData = { name: "", description: "", image: null }, onSubmit }) => {
  const { id: categoryId } = useParams();
  const [itemData, setItemData] = useState(initialData);
  const [error, setError] = useState(null);

  // Ensure data is updated when `initialData` changes
  useEffect(() => {
    if (initialData.name || initialData.description) {
      setItemData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setItemData({ ...itemData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit) {
      console.error("Error: onSubmit function is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    if (itemData.image) {
      formData.append("image", itemData.image);
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setError("Failed to save item");
      console.error("Error saving item", error);
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
        <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-gray-300 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer">
          {initialData.name ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

ItemForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File),
      PropTypes.oneOf([null])
    ]),
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default ItemForm;
