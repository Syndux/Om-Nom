import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import { loadAllFoods } from "../../store/foods";
import { useAppContext } from "../../context/AppContext";

import { OpenModalButton } from "../../components";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

const AllFoodsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const foods = useSelector((state) => Object.values(state.foods));
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const { setSidebarOpen } = useAppContext();

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    })();
  }, [dispatch]);

  const handleEdit = (foodId) => {
    history.push(`/foods/${foodId}/edit`);
  };

  return (
    // DEVNOTE - make component for the same divs across pages?
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-71px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {loaded && (
            <>
              <div className="m-4 flex items-center justify-between text-xl font-bold">
                <p>Browse all available foods</p>
                <button
                  className="text-secondary-dark-bg dark:text-light-gray rounded-lg p-1.5 duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
                  onClick={() => history.push("/foods/new")}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]"
                >
                  <div>
                    <p className="text-lg">{food.name}</p>
                    <p className="text-sm opacity-60">{food.cuisine}</p>
                  </div>
                  {sessionUser && sessionUser?.id === food.creatorId && (
                    <div className="flex flex-row gap-4">
                      <button
                        className="text-secondary-dark-bg dark:text-light-gray rounded-lg px-1 text-xl duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
                        onClick={() => handleEdit(food.id)}
                      >
                        <FaEdit />
                      </button>
                      <OpenModalButton
                        modalComponent={<ConfirmDeleteModal foodId={food.id} />}
                        buttonText={<FaTrash />}
                        // onButtonClick={() => setSidebarOpen(false)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFoodsPage;
