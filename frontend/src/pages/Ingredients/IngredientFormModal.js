import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { useModal } from "../../context/ModalContext";

const IngredientFormModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ingredientId } = useParams();
  const isEdit = !!ingredientId;
  const sessionUser = useSelector((state) => state.session.user);
  const ingredientToEdit = useSelector(
    (state) => state.ingredients[ingredientId],
  );
  const { closeModal } = useModal();
  const [loaded, setLoaded] = useState(true);

  const handleCreate = () => {

  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="overflow-hidden text-left shadow-xl bg-gray-400 dark:bg-main-dark-bg">
      <div className="flex items-start">
        <div className="m-4">
          <p className="text-lg text-center font-semibold text-main-dark-bg dark:text-light-gray">
            Create Ingredient
          </p>
          <form className="mt-2">
            <input
              className="w-full rounded-lg bg-gray-200 p-1.5 dark:bg-gray-400 placeholder:italic placeholder:text-gray-700 focus:outline-none"
              placeholder="Name"
              type="text"
            />
          </form>
        </div>
      </div>
      <div className="px-4 pt-1 pb-3 justify-center sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={() => handleCreate()}
        >
          Create
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
};

export default IngredientFormModal;
