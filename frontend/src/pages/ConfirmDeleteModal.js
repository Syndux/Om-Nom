import React from "react";
import { useModal } from "../context/ModalContext";

const handleDelete = (foodId, closeModal) => {
    
    closeModal();
}

const handleCancel = (closeModal) => {
    closeModal();
}

const ConfirmDeleteModal = ({ foodId }) => {
    const { closeModal } = useModal();
  return (
    <div className="overflow-hidden text-left shadow-xl">
      <div className="flex items-start">
        <div className="m-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Delete Food
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this food?
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => handleDelete(foodId, closeModal)}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => handleCancel(closeModal)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
