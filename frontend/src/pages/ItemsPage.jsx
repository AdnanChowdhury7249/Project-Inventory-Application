import ItemList from "../components/ItemList"
import { useNavigate, useParams } from "react-router-dom";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="block mx-auto text-x2 font-bold py-2 px-4 border rounded-sm cursor-pointer mb-4"
        onClick={() => navigate(`/category/${id}/add-item`)}>add Item</button>
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
            onClick={() => navigate("/items")}
          >
            All Items
          </button>
        </div>
      </div>
      <ItemList />

    </div>
  );
};

export default ItemPage;


