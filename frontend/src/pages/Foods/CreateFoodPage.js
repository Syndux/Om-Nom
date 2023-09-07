import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadAllFoods,
  loadSingleFood,
  createFood,
  updateFood,
} from "../../store/foods";

const CreateFoodPage = () => {
  const dispatch = useDispatch();
  const { routeId } = useParams();
  const isEdit = !!routeId;

  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    cuisine: "",
    ingredients: [],
  });

  useEffect(() => {
    dispatch(loadAllFoods());

    if (isEdit) {
      dispatch(loadSingleFood(routeId));
    }
  }, [dispatch, isEdit, routeId]);

  const foodToEdit = useSelector((state) =>
    state.foods.find((food) => food.id === routeId),
  );

  useEffect(() => {
    if (isEdit && foodToEdit) {
      setFormData({
        name: foodToEdit.name,
        imgUrl: foodToEdit.imgUrl,
        cuisine: foodToEdit.cuisine,
        ingredients: foodToEdit.ingredients,
      });
    }
  }, [isEdit, foodToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateFood(routeId, formData));
    } else {
      dispatch(createFood(formData));
    }

    setFormData({
      name: "",
      imgUrl: "",
      cuisine: "",
      ingredients: [],
    });
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Food" : "Create Food"}</h2>
      <form onSubmit={handleSubmit}>
        {/* ... Form fields for name, imgUrl, cuisine, and ingredients ... */}
        <button type="submit">{isEdit ? "Update Food" : "Create Food"}</button>
      </form>
    </div>
  );
};

export default CreateFoodPage;
