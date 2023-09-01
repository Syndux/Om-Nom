import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LoginFormPage from "./components/Login-Signup/LoginFormPage";
import SignupFormPage from "./components/Login-Signup/SignupFormPage";
import Navigation from "./components/Navigation";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const activeMenu = false;
  return (
    // <>
    //   <Navigation isLoaded={isLoaded} />
    //   {isLoaded && (
    //     <Switch>
    //       {/* Home */}
    //       {/* Meals */}
    //       {/* Ingredients */}
    //       {/* Meal Planning */}
    //       <Route path="/login" component={() => <LoginFormPage />} />
    //       <Route path="/signup" component={() => <SignupFormPage />} />
    //       <Route exact path="/" component={() => <LandingPage /> } />
    //     </Switch>
    //   )}
    // </>
    <div>
      {isLoaded && activeMenu ? (
        <div className="sidebar fixed w-60 bg-white dark:bg-secondary-dark-bg">
          Active Sidebar
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">Inactive Sidebar</div>
      )}
      <div
        className={`min-h-screen w-full bg-main-bg dark:bg-main-bg ${
          activeMenu ? `md:ml-72` : `flex-2`
        }`}
      >
        <div className="navbar fixed w-full bg-main-bg dark:bg-main-dark-bg md:static">
          NavBar
        </div>
      </div>

      <div>
        {/* Preparing to update ReactRouterDom v6 */}
        <Switch>
          {/* Home */}
          <Route exact path="/" component={LandingPage} /> {/* View for logged-in (explore) and logged-out (showcase) */}
          {/* Meals */}
          <Route path="/meals/current" component={} /> {/* SIDEBAR - View all meals */}
          <Route path="/meals/saved" component={} /> {/* SIDEBAR - View favorite/saved meals - Coming soon!*/}
          <Route path="/meals/:mealId" component={} /> {/* View singular meal */}
          <Route path="/meals" component={} /> {/* SIDEBAR - View all meals */}
          {/* Ingredients */}
          <Route path="/ingredients" component={} /> {/* SIDEBAR - View all ingredients */}
          {/* Meal Planning */}
          <Route path="/meal-plan" component={} /> {/* SIDEBAR - Calendar for meals - Coming soon!*/}
        </Switch>
      </div>
    </div>
  );
}

export default App;
