import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({ name: "", description: "" });

  useEffect(() => {
    getCategoryById(id)
      .then((res) => setCategoryData(res.data)) // ✅ Fetch category details for editing
      .catch((err) => console.error("Error fetching category", err));
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateCategory(id, updatedData); // ✅ Call API to update category
      navigate("/"); // ✅ Redirect after updating
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Edit Category</h1>
      <CategoryForm initialData={categoryData} onSubmit={handleUpdate} /> {/* ✅ Pass `handleUpdate` */}
    </div>
  );
};

export default CategoryEditPage;
