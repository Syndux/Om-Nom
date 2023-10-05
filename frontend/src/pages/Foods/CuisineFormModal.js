import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/ModalContext";

const CuisineFormModal = ({ cuisineId }) => {
  const dispatch = useDispatch();
  const isEdit = !!cuisineId;
  const sessionUser = useSelector((state) => state.session.user);

  return <div>CuisineFormModal</div>;
};

export default CuisineFormModal;
