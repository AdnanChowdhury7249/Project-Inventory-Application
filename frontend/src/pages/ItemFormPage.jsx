import ItemForm from "../components/ItemForm";
import { useNavigate } from "react-router-dom";


const ItemFormPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Create a New Item</h1>
      <button
        className="block mx-auto text-x2 font-bold py-4 px-5 border rounded-sm cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <ItemForm />
    </div>
  );
};

export default ItemFormPage;
