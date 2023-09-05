import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { Navbar, Sidebar } from "./components";
import {
  ComingSoonPage,
  ExplorePage,
  ShowcasePage,
  AllIngredientsPage,
  OwnedMealsPage,
  MealDetailsPage,
  AllMealsPage,
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
    const currentThemeSetting = localStorage.getItem('themeSetting');
    if (currentThemeSetting) setCurrentMode(currentThemeSetting);
  }, []);

  return (
    isLoaded && (
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="relative flex dark:bg-main-dark-bg">
          <div
            className={`${
              sidebarOpen
                ? "sidebar fixed w-60 bg-main-bg dark:bg-secondary-dark-bg"
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
          </div>
          {/* Preparing to update ReactRouterDom v6 */}
          <Switch>
            {/* Home */}
            {/* SIDEBAR - View for logged-out (showcase) */}
            <Route exact path="/" component={ShowcasePage} />
            {/* SIDEBAR - View for logged-in (home) */}
            <Route path="/home" component={ExplorePage} />

            {/* Meals */}
            {/* SIDEBAR - View all of your meals */}
            <Route path="/meals/current" component={OwnedMealsPage} />
            {/* SIDEBAR - View favorite/saved meals - Coming soon! */}
            <Route path="/meals/saved" component={ComingSoonPage} />
            {/* View singular meal */}
            <Route path="/meals/:mealId" component={MealDetailsPage} />
            {/* SIDEBAR - View all meals */}
            <Route path="/meals" component={AllMealsPage} />

            {/* Ingredients */}
            {/* SIDEBAR - View all ingredients */}
            <Route path="/ingredients" component={AllIngredientsPage} />

            {/* Meal Planning */}
            {/* SIDEBAR - Calendar for meals - Coming soon!*/}
            <Route path="/meal-plan" component={ComingSoonPage} />

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
            <Route>
              Page not found
            </Route>
          </Switch>
        </div>
      </div>
    )
  );
}

export default App;
