import { addCategory } from "../api";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

const CategoryFormPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (categoryData) => {
    try {
      await addCategory(categoryData);
      navigate("/");
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold py-10">Create Category</h2>
      <CategoryForm onSubmit={handleCreate} />
    </div>
  );
};

export default CategoryFormPage;
