import Modal from "react-modal";

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg w-80 transition-transform transform scale-95 animate-fadeIn"
      overlayClassName="fixed inset-0 bg-transparent flex items-center justify-center"

    >
      <h3 className="text-lg font-bold">Confirm Deletion</h3>
      <p className="my-3">Are you sure you want to delete this category?</p>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
