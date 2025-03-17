import ItemForm from "../components/ItemForm";
import { useParams, useNavigate } from "react-router-dom";
import { addItem } from "../api";

const ItemFormPage = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await addItem(categoryId, formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Create a New Item</h1>
      <ItemForm initialData={{ name: "", description: "", image: null }} onSubmit={handleCreate} />
    </div>
  );
};

export default ItemFormPage;
