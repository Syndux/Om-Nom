import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { LandingPage } from "./pages";
import {
  ComingSoon,
  Meals,
  Meal,
  MealsOwned,
  Navbar,
  Ingredients,
  Sidebar
} from "./components";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const activeMenu = true;

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
          {/* View for logged-in (explore) and logged-out (showcase) */}
          <Route exact path="/" component={LandingPage} />{" "}
          
          {/* Meals */}
          {/* SIDEBAR - View all of your meals */}
          <Route path="/meals/current" component={MealsOwned} />
          {/* SIDEBAR - View favorite/saved meals - Coming soon! */}
          <Route path="/meals/saved" component={ComingSoon} />
          {/* View singular meal */}
          <Route path="/meals/:mealId" component={Meal} />
          {/* SIDEBAR - View all meals */}
          <Route path="/meals" component={Meals} />
          
          {/* Ingredients */}
          {/* SIDEBAR - View all ingredients */}
          <Route path="/ingredients" component={Ingredients} />
          
          {/* Meal Planning */}
          {/* SIDEBAR - Calendar for meals - Coming soon!*/}
          <Route path="/meal-plan" component={ComingSoon} />
          
          {/* User Profile */}
          {/* NAVBAR - View followers/following after clicking text in profile dropdown - Coming soon! */}
          <Route path="/following" component={ComingSoon} />
          {/* NAVBAR - View all reviews you made - Coming soon! */}
          <Route path="/reviews" component={ComingSoon} />
          {/* NAVBAR - View your messages - Coming soon! */}
          <Route path="/messages" component={ComingSoon} />
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
