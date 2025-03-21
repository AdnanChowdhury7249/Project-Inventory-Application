import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

const CategoryCard = ({ category, handleDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div
      key={category.id}
      className="border rounded-3xl shadow border-gray-200 bg-white 
             transition-transform duration-500 ease-in-out 
             hover:scale-102 hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      {category.image_url && (
        <div className="rounded-t-3xl w-full h-50 flex justify-center items-center bg-gray-100 overflow-hidden">
          <img
            src={`http://localhost:5000${category.image_url}`}
            alt={category.name}
            className="w-full h-full object-fill"
          />
        </div>
      )}
      <div className="flex items-center justify-between my-6 px-6">
        <h2 className="text-red-1x1 font-medium">{category.name}</h2>
        <div className="flex gap-2">
          <button
            className="cursor-pointer hover:bg-gray-200 rounded p-1"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/category/${category.id}/edit`);
            }}
          >
            <img
              src={editIcon}
              alt="Edit"
              className="w-6 h-6 transition duration-200 hover:grayscale hover:brightness-5 "
            />
          </button>

          <button
            className="cursor-pointer hover:bg-gray-200 rounded p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(category.id);
            }}
          >
            <img
              src={deleteIcon}
              alt="Delete"
              className="w-6 h-6 transition duration-200 hover:grayscale hover:brightness-5 "
            />
          </button>
        </div>
      </div>
      <p className="ml-6 p-0.5 my-6 text-gray-500 text-sm">{category.description}</p>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default CategoryCard;
