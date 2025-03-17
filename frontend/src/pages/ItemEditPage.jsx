import { useEffect, useState } from "react";
import { getItemById, updateItem } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";

const ItemEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({ name: "", description: "", image: null });

  // Fetch item details for editing
  useEffect(() => {
    getItemById(id)
      .then((res) => setItemData(res.data))
      .catch((error) => console.error("Error fetching item", error));
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updateItem(id, updatedData);
      navigate(-1);
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Edit Item</h1>
      <ItemForm initialData={itemData} onSubmit={handleSubmit} />
    </div>
  );
};

export default ItemEditPage;
