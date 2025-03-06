import { useEffect, useState } from "react";
import { getCategories } from "../api";

const CategoriesPage = () => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("error fetching categories", err))
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 gap-4 py-30 w-6/12 mx-auto">
        {Categories.map((cat) => (
          <div key={cat.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{cat.name}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default CategoriesPage;
