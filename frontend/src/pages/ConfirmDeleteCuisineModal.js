import React from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../context/ModalContext";
import { deleteCuisine, loadAllCuisines } from "../store/cuisines";

const ConfirmDeleteCuisineModal = ({ cuisineId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (cuisineId) => {
        const deleteFunc = async () => {
            await dispatch(deleteCuisine(cuisineId));
            dispatch(loadAllCuisines());
        }

        deleteFunc();
        closeModal();
    }

    const handleCancel = () => {
        closeModal();
    };

    return (
        <div className="overflow-hidden text-left shadow-xl">
          <div className="flex items-start">
            <div className="m-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                Delete cuisine
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this cuisine?
                </p>
              </div>
            </div>
          </div>
    
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={() => handleDelete(cuisineId)}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      );
}

export default ConfirmDeleteCuisineModal;