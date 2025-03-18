import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import CategoryCard from "./CategoryCard";



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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">Categories </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-full max-w-5xl">
          {Categories.length > 0 ? (
            Categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} handleDeleteClick={handleDeleteClick} />
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
        </div>
      </div>
      <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} />
    </div>
  );
};

export default CategoriesPage;
