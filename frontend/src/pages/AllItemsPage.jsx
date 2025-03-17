import { useState, useEffect } from "react";
import { getAllItems } from "../api";

const AllItemsPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllItems()
      .then((res) =>
        setItems(res.data))
      .catch((error) => console.error("error displaying items", error))
  }, [])

  return (
    <div>
      <h2 className="text-center text-2xl font-bold py-10">All Items</h2>
      <div className="grid grid-cols-2 gap-4 py-20 w-6/12 mx-auto">
        {items.map((item) => (
          <div key={item.id}
            className="p-4 border rounded shadow  hover:bg-gray-100 transition">
            <h2 className="text-lg font-bold my-2.5">{item.name}</h2>
            <p>{item.description}</p>
            <p className="text-sm my-2.5">Category: {item.category_name || "unknown"}</p> {/* ✅ Display category */}

          </div>
        ))}

      </div>
    </div>

  )
}

export default AllItemsPage
