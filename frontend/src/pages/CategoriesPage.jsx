import CategoryList from "../components/CategoryList";
import { useNavigate } from "react-router-dom";


const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="flex bg-gray-100 rounded-b-md p-1 shadow-md w-1/2 max-w-lg justify-between">
          <button
            className="flex-1 px-6 py-2 text-gray-600 font-medium rounded-md  transition duration-300 
                 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md cursor-pointer"
            onClick={() => navigate("/create-category")}
          >
            Create Category
          </button>
          <button
            className="flex-1 px-6 py- text-gray-600 font-medium rounded-md  transition duration-300 
                 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md cursor-pointer"
            onClick={() => navigate("/items")}
          >
            All Items
          </button>
        </div>
      </div>
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
