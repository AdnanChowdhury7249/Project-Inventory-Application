import { useEffect, useState } from "react";
import { getItems, getCategoryById, deleteItem } from "../api";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";


const ItemsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();



  const handleDeleteClick = (id) => {
    setSelectedItem(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem)
      try {
        await deleteItem(selectedItem)
        setItems((prevCategories) => prevCategories.filter((cat) => cat.id !== selectedItem))
        setIsModalOpen(false);
      } catch (err) {
        console.error("error deleting category", err)
      }
  }
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
        .catch((err) => console.error("error fetching item", err))
    }
  }, [id])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">Items in {categoryName}
      </h1>
      <div className=" flex justify-center">
        <div className="grid grid-cols-2 gap-4 py-10 w-6/12">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="p-4 border rounded shadow">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p>{item.description}</p>
                <button
                  className=" cursor-pointer bg bg-red-500 border-none rounded w-25 my-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item.id);
                  }}>
                  Delete
                </button>
                <button
                  className=" cursor-pointer bg bg-blue-500 border-none rounded w-25 my-2.5 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/item/${item.id}/edit`);
                  }}
                >
                  Edit</button>
              </div>
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete} />
    </div>

  )
};

export default ItemsPage;
