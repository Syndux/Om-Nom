import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { Navbar, Sidebar } from "./components";
import {
  ComingSoonPage,
  ExplorePage,
  ShowcasePage,
  AllIngredientsPage,
  OwnedFoodsPage,
  FoodDetailsPage,
  AllFoodsPage,
  FavoriteFoodsPage,
  FoodPlanPage,
} from "./pages";

import * as sessionActions from "./store/session";

import { useAppContext } from "./context/AppContext";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { sidebarOpen, currentMode, setCurrentMode } = useAppContext();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const currentThemeSetting = localStorage.getItem("themeSetting");
    if (currentThemeSetting) setCurrentMode(currentThemeSetting);
  }, [setCurrentMode]);

  return (
    isLoaded && (
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="relative flex dark:bg-main-dark-bg">
          <div
            className={`${
              sidebarOpen
                ? "sidebar fixed w-60 bg-main-bg dark:bg-main-dark-bg"
                : "w-0 dark:bg-secondary-dark-bg"
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`min-h-screen w-full bg-main-bg dark:bg-main-bg ${
              sidebarOpen ? `md:ml-60` : `flex-2`
            }`}
          >
            <div className="navbar fixed w-full bg-main-bg dark:bg-main-dark-bg md:static">
              <Navbar />
            </div>
            {/* Preparing to update ReactRouterDom v6 */}
            <Switch>
              {/* Home */}
              {/* SIDEBAR - View for logged-out (showcase) */}
              <Route exact path="/" component={ShowcasePage} />
              {/* SIDEBAR - View for logged-in (home) */}
              <Route path="/home" component={ExplorePage} />

              {/* Foods */}
              {/* SIDEBAR - View all of your foods */}
              <Route path="/foods/current" component={OwnedFoodsPage} />
              {/* SIDEBAR - View favorite/saved foods - Coming soon! */}
              <Route path="/foods/saved" component={FavoriteFoodsPage} />
              {/* View singular food */}
              <Route path="/foods/:foodId" component={FoodDetailsPage} />
              {/* SIDEBAR - View all foods */}
              <Route path="/foods" component={AllFoodsPage} />

              {/* Ingredients */}
              {/* SIDEBAR - View all ingredients */}
              <Route path="/ingredients" component={AllIngredientsPage} />

              {/* Food Planning */}
              {/* SIDEBAR - Calendar for foods - Coming soon!*/}
              <Route path="/food-plan" component={FoodPlanPage} />

              {/* User Profile */}
              {/* NAVBAR - View profile after dropdown - Coming soon! */}
              <Route path="/profile" component={ComingSoonPage} />
              {/* NAVBAR - View followers/following after dropdown - Coming soon! */}
              <Route path="/following" component={ComingSoonPage} />
              {/* NAVBAR - View all reviews you made - Coming soon! */}
              <Route path="/reviews" component={ComingSoonPage} />
              {/* NAVBAR - View your messages - Coming soon! */}
              <Route path="/messages" component={ComingSoonPage} />
              {/* Logout */}
              <Route path="/logout">
                <Redirect to="/" />
              </Route>
              <Route>Page not found</Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  );
}

export default App;
