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
    <div>
      <h2>Add new Category</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          name="description"
          value={categoryData.description}
          onChange={handleChange}
          placeholder="Category Description"
          required
        />
        <button type="submit">Add Category</button>
      </form>

    </div>
  )
}

export default CategoryForm
