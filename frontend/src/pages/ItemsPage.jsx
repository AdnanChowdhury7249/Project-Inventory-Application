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
      <ItemList />

    </div>
  );
};

export default ItemPage;


