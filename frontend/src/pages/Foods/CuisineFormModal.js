import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/ModalContext";
import {
  createCuisine,
  loadAllCuisines,
  updateCuisine,
} from "../../store/cuisines";

const CuisineFormModal = ({ cuisineId }) => {
  const dispatch = useDispatch();
  const isEdit = !!cuisineId;
  const sessionUser = useSelector((state) => state.session.user);
  const cuisineToEdit = useSelector((state) => state.cuisines[cuisineId]);

  const [formData, setFormData] = useState({ name: "" });
  const [validationErrors, setValidationErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { closeModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadAllCuisines());
      setLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && cuisineToEdit) {
      setFormData({ name: cuisineToEdit.name });
    }
  }, [isEdit, cuisineToEdit]);

  const validateName = () => {
    const errors = [];
    if (!formData.name) {
      errors.push("A cuisine name is required.");
    }

    if (formData.name.length < 2 || formData.name.length > 20) {
      errors.push("Cuisine name must be between 2 and 20 characters.");
    }
    return errors;
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValErrors = validateName();
    const valErrors = [...nameValErrors];

    if (valErrors.length > 0) {
      setValidationErrors(valErrors);
      return;
    }

    let newCuisineId;

    try {
      if (isEdit) {
        newCuisineId = await dispatch(updateCuisine(cuisineId, formData));
      } else {
        newCuisineId = await dispatch(createCuisine(formData));
      }

      if (newCuisineId !== null) {
        setFormData({ name: "" });
        setValidationErrors([]);

        closeModal();
      }
    } catch (error) {
      const res = await error.json();
      if (res.errors) {
        setValidationErrors(Object.values(res.errors));
      } else if (res.message) {
        setValidationErrors([res.message]);
      }
    }
  };

  return (
    <div className="overflow-hidden bg-slate-300 shadow-xl dark:bg-main-dark-bg">
      <div className="flex">
        {sessionUser && loaded ? (
          <div className="m-4">
            <p className="text-center text-lg font-semibold text-main-dark-bg dark:text-light-gray">
              {isEdit ? "Edit Cuisine" : "Create Cuisine"}
            </p>
            {validationErrors.length > 0 && (
              <div className="w-48 bg-red-300 p-2 text-center italic text-slate-900 sm:w-auto">
                {validationErrors.map((error, index) => (
                  <div className="m-0.5 text-sm" key={index}>
                    {error}
                  </div>
                ))}
              </div>
            )}
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full rounded-lg bg-gray-100 p-1.5 placeholder:italic placeholder:text-gray-700 focus:outline-none dark:bg-gray-400"
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <div className="w-full justify-center px-4 pt-5 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  {isEdit ? "Edit" : "Create"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="m-4 flex justify-center text-xl font-bold dark:text-main-bg">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default CuisineFormModal;
