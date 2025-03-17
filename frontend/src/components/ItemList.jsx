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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-full max-w-5xl">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className=" border rounded-3xl shadow border-gray-200 bg-white 
             transition-transform duration-500 ease-in-out 
             hover:scale-102 hover:shadow-lg">
                {item.image_url && (
                  <div className=" rounded-t-3xl w-full h-50 flex justify-center items-center bg-gray-100  overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.image_url}`}
                      alt={item.name}
                      className=" w-full h-full object-fill"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between my-4">
                  <h2 className=" ml-8 text-lg font-bold">{item.name}</h2>

                  <div className="flex space-x-2 mr-4">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item.id);
                      }}>
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/item/${item.id}/edit`);
                      }}>
                      Edit
                    </button>
                  </div>
                </div>
                <p className="ml-8 my-8 text-gray-500">{item.description}</p>
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
