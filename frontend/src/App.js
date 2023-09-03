import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { ComingSoonPage, Explore, Showcase, AllIngredientsPage, OwnedMealsPage } from "./pages";
import { Meals, Meal, Navbar, Sidebar } from "./components";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Temp vars
  const activeMenu = true;
  const currentMode = "light";

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="relative flex dark:bg-main-dark-bg">
        {isLoaded && activeMenu ? (
          <div className="sidebar fixed w-60 bg-white dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={`min-h-screen w-full bg-main-bg dark:bg-main-bg ${
            activeMenu ? `md:ml-60` : `flex-2`
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
          <Route exact path="/" component={Showcase} />
          {/* SIDEBAR - View for logged-in (home) */}
          <Route path="/home" component={Explore} />

          {/* Meals */}
          {/* SIDEBAR - View all of your meals */}
          <Route path="/meals/current" component={OwnedMealsPage} />
          {/* SIDEBAR - View favorite/saved meals - Coming soon! */}
          <Route path="/meals/saved" component={ComingSoonPage} />
          {/* View singular meal */}
          <Route path="/meals/:mealId" component={Meal} />
          {/* SIDEBAR - View all meals */}
          <Route path="/meals" component={Meals} />

          {/* Ingredients */}
          {/* SIDEBAR - View all ingredients */}
          <Route path="/ingredients" component={AllIngredientsPage} />

          {/* Meal Planning */}
          {/* SIDEBAR - Calendar for meals - Coming soon!*/}
          <Route path="/meal-plan" component={ComingSoonPage} />

          {/* User Profile */}
          {/* NAVBAR - View followers/following after clicking text in profile dropdown - Coming soon! */}
          <Route path="/following" component={ComingSoonPage} />
          {/* NAVBAR - View all reviews you made - Coming soon! */}
          <Route path="/reviews" component={ComingSoonPage} />
          {/* NAVBAR - View your messages - Coming soon! */}
          <Route path="/messages" component={ComingSoonPage} />
          {/* Logout */}
          <Route path="/logout">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
