import CategoryForm from "../components/CategoryForm";
import { useNavigate } from "react-router-dom";

const CategoryFormPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-10">Create a New Category</h1>
      <button
        className="block mx-auto text-x2 font-bold py-4 px-5 border rounded-sm cursor-pointer"
        onClick={() => navigate(-1)} // ✅ Go back to the previous page
      >
        Go Back
      </button>
      <CategoryForm />
    </div>
  );
};

export default CategoryFormPage;
