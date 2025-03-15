import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

const CategoryEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({ name: "", description: "" })

  useEffect(() => {
    getCategoryById(id)
      .then((res) => setCategoryData(res.data))
      .catch((error) => console.error("error adding data", error))
  }, [id])

  const handleSubmit = async (updatedData) => {
    try {
      await updateCategory(id, updatedData)
      navigate("/")
    } catch (error) {
      console.error("Error updating category", error);


    }
  }


  return (
    <div>
      <h2 className="text-center text-2xl font-bold py-10">Edit Category</h2>
      <CategoryForm initialData={categoryData} onSubmit={handleSubmit} />
    </div>
  )
}

export default CategoryEditPage
