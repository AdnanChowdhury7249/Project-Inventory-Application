import { useEffect, useState } from "react";
import { getItems, getCategoryById, deleteItem } from "../api";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import ItemCard from "./ItemCard";

const ItemsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("Loading...");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((res) => setCategoryName(res.data.name))
        .catch(() => setCategoryName("Unknown Category"));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getItems(id)
        .then((res) => setItems(res.data))
        .catch((err) => console.error("Error fetching items", err));
    }
  }, [id]);


  const handleDeleteClick = (id) => {
    setSelectedItem(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await deleteItem(selectedItem);
        setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem));
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error deleting item", err);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">Items in {categoryName}</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-full max-w-5xl">
          {items.length > 0 ? (
            items.map((item) => (
              <ItemCard key={item.id} item={item} handleDeleteClick={handleDeleteClick} showActions={true} />
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

export default ItemsPage;
