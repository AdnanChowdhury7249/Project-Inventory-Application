import { useEffect, useState } from "react";
import { getItems, getCategoryById } from "../api";
import { useParams } from "react-router-dom";

const ItemsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");

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
              </div>
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
        </div>
      </div>
    </div>
  )
};

export default ItemsPage;
