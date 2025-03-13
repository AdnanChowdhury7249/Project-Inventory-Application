import { useState, useEffect } from "react";

const CategoryForm = ({ initialData = { name: "", description: "" }, onSubmit }) => {
  const [categoryData, setCategoryData] = useState(initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCategoryData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit) {
      console.error("Error: onSubmit function is missing!");
      return;
    }
    try {
      await onSubmit(categoryData);
    } catch (error) {
      setError("Failed to save category");
      console.error("Error saving category", error);
    }
  };

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
          name="description"
          value={categoryData.description}
          onChange={handleChange}
          placeholder="Category Description"
          required
          className="p-2 border border-gray-300 rounded w-full h-32 resize-none"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer">
          {initialData.name ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
