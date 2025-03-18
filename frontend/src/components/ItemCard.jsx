import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

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
      <div className="flex items-center justify-between my-4 px-6">
        <h2 className="text-lg font-bold">{item.name}</h2>
        {showActions && (
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => navigate(`/item/${item.id}/edit`)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => handleDeleteClick(item.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="ml-8 my-8 text-gray-500">{item.description}</p>

      {showCategory && (<p className="px-6 my-4 text-gray-500 text-sm">Category: {item.category_name}</p>)}

    </div>
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
