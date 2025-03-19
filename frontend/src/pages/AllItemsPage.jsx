import { useEffect, useState } from "react";
import { getAllItems } from "../api";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

const AllItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllItems()
      .then((res) => setItems(res.data || []))
      .catch((error) => {
        console.error("Error fetching all items", error);
        setError("Failed to fetch items.");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold py-10">All Items</h2>
      <div className="flex justify-center my-10">
        <div className="flex bg-gray-100 rounded-b-md p-1 shadow-md w-1/2 max-w-lg justify-between">
          <button
            className="flex-1 px-6 py-2 text-gray-600 font-medium rounded-md  transition duration-300 
                 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back to categories
          </button>
          <button
            className="flex-1 px-6 py- text-gray-600 font-medium rounded-md  transition duration-300 
                 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md cursor-pointer"
            onClick={() => navigate("/create-category")}
          >
            Create Category
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-full max-w-5xl">
          {items.length > 0 ? (
            items.map((item) => <ItemCard key={item.id} item={item} showCategory={true} />)
          ) : (
            <p className="text-center col-span-3 text-gray-500">No items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllItemsPage;

