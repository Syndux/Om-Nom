import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadAllFoods,
  loadSingleFood,
  createFood,
  updateFood,
} from "../../store/foods";

// Require auth, handle API errors: {name: "ERROR HERE" }

const FoodFormPage = () => {
  const dispatch = useDispatch();
  const { routeId } = useParams();
  const isEdit = !!routeId;
  const foodToEdit = useSelector((state) => state.foods[routeId]);

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
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={(e) =>
              setFormData({ ...formData, imgUrl: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="cuisine">Cuisine:</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={(e) =>
              setFormData({ ...formData, cuisine: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">{isEdit ? "Update Food" : "Create Food"}</button>
      </form>
    </div>
  );
};

export default FoodFormPage;
