import { useState } from "react";
import { addCategory } from "../api";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryData)
      navigate("/");
    } catch (error) {
      setError("failed to add category")
      console.error("error adding category", error)
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">

      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          type="text"
          name="description"
          value={categoryData.description}
          onChange={handleChange}
          placeholder="Category Description"
          required
          className="p-2 border border-gray-300 rounded w-full h-32 resize-none" />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer">Add Category</button>
      </form>

    </div>
  )
}

export default CategoryForm
