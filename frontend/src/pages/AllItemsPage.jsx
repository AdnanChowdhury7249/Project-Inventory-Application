import { useEffect, useState } from "react";
import { getAllItems } from "../api";
import ItemCard from "../components/ItemCard";

const AllItemsPage = () => {
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
