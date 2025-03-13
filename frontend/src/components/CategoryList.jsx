import { useEffect, useState } from "react";
import { getCategories, deleteCategory, updateCategory } from "../api";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";



const CategoriesPage = () => {
  const [Categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("error fetching categories", err))
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedCategory(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory)
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== selectedCategory))
        setIsModalOpen(false); //
      } catch (err) {
        console.error("error deleting category", err)
      }
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 py-30 w-6/12 mx-auto">
        {Categories.map((cat) => (
          <div key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition">
            <h2 className="text-lg font-bold">{cat.name}</h2>
            <p>{cat.description}</p>
            <button
              className=" cursor-pointer bg bg-red-500 border-none rounded w-25 my-2.5"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(cat.id);
              }}>
              Delete
            </button>
            <button
              className=" cursor-pointer bg bg-blue-500 border-none rounded w-25 my-2.5 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/category/${cat.id}/edit`);
              }}
            >
              Edit</button>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete} />
    </div>

  )
}

export default CategoriesPage;
