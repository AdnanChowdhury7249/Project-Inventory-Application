import CategoryList from "../components/CategoryList";
import { useNavigate } from "react-router-dom";


const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center gap-4 my-10">
        <button
          className="w-40 py-3 px-5 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
          onClick={() => navigate("/create-category")}
        >
          Create Category
        </button>
        <button
          className="w-40 py-3 px-5 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
          onClick={() => navigate("/items")}
        >
          All Items
        </button>
      </div>

      <CategoryList />
    </div>
  );
};

export default CategoryPage;
