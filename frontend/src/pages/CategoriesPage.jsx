import CategoryList from "../components/CategoryList";
import { useNavigate } from "react-router-dom";


const CategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Inventory App</h1>
      <button className="block  mx-auto text-x2 font-bold py-4 px-5 border rounded-sm cursor-pointer" onClick={() => navigate("/create-category")}> Create Category</button>
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
