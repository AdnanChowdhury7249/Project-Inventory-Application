import Modal from "react-modal";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10); // Small delay to trigger animation
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen} // Ensure modal is always mounted when isOpen is true
      onRequestClose={onClose}
      className={`bg-white p-6 rounded-lg shadow-lg w-120 transform transition-all duration-300 ease-out ${showAnimation ? "animate-modalOpen" : "opacity-0 scale-95"
        }`}
      overlayClassName={`fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center transition-opacity duration-500 ease-out ${isOpen ? "opacity-100" : "opacity-0"
        }`}
    >
      <h3 className="text-lg font-bold">Are you sure?</h3>
      <p className="my-3">This will permanently delete this item</p>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          className="bg-gray-100 px-4 py-2 rounded transition duration-200 hover:bg-gray-200 border-gray-200 cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-600 cursor-pointer"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
