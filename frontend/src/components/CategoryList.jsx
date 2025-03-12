import { useEffect, useState } from "react";
import { getCategories } from "../api";
import { useNavigate } from "react-router-dom";


const CategoriesPage = () => {
  const [Categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("error fetching categories", err))
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 py-30 w-6/12 mx-auto">
        {Categories.map((cat) => (
          <div key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition">


            <h2 className="text-lg font-bold">{cat.name}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default CategoriesPage;
