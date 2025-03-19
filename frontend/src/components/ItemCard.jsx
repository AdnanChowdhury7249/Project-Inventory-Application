import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

const ItemCard = ({ item, showActions = false, showCategory = false, handleDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div
      key={item.id}
      className="border rounded-3xl shadow border-gray-200 bg-white 
             transition-transform duration-500 ease-in-out 
             hover:scale-102 hover:shadow-lg"
    >
      {item.image_url && (
        <div className="rounded-t-3xl w-full h-50 flex justify-center items-center bg-gray-100 overflow-hidden">
          <img
            src={`http://localhost:5000${item.image_url}`}
            alt={item.name}
            className="w-full h-full object-fill"
          />
        </div>
      )}
      <div className="flex items-center justify-between my-6 px-6">
        <h2 className="text-red-1x1 font-medium">{item.name}</h2>
        {showActions && (
          <div className="flex gap-2">
            <button
              className="cursor-pointer hover:bg-gray-200 rounded p-1"
              onClick={() => navigate(`/item/${item.id}/edit`)}
            >
              <img
                src={editIcon}
                alt="Delete"
                className="w-6 h-6 transition duration-200 hover:grayscale hover:brightness-5 "
              />
            </button>

            <button
              className="cursor-pointer hover:bg-gray-200 rounded p-1"
              onClick={() => handleDeleteClick(item.id)}
            >
              <img
                src={deleteIcon}
                alt="Delete"
                className="w-6 h-6 transition duration-200 hover:grayscale hover:brightness-5 "
              />
            </button>
          </div>
        )}
      </div>

      <p className="ml-5 p-0.5 my-6 text-sm">{item.description}</p>

      {showCategory && (<p className="px-6 my-4 text-gray-500 text-sm">Category: {item.category_name}</p>)}

    </div >
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    category_name: PropTypes.string,
  }).isRequired,
  showActions: PropTypes.bool,
  onDelete: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  showCategory: PropTypes.bool
};

export default ItemCard;
