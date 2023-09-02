import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import ComingSoon from "./components/ComingSoon";
import LandingPage from "./components/LandingPage";
import LoginFormPage from "./components/Login-Signup/LoginFormPage";
import SignupFormPage from "./components/Login-Signup/SignupFormPage";
import Meals from "./components/Meals";
import Meal from "./components/Meals/Meal";
import MealsOwned from "./components/Meals/MealsOwned";
import Navbar from "./components/Navbar";
import Ingredients from "./components/Ingredients";
import Sidebar from "./components/Sidebar";

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
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          Inactive Sidebar
          <Sidebar />
        </div>
      )}
      <div
        className={`min-h-screen w-full bg-main-bg dark:bg-main-bg ${
          activeMenu ? `md:ml-72` : `flex-2`
        }`}
      >
        <div className="navbar fixed w-full bg-main-bg dark:bg-main-dark-bg md:static">
          <Navbar />
        </div>
      </div>
        {/* Preparing to update ReactRouterDom v6 */}
        <Switch>
          {/* Home */}
          <Route exact path="/" component={LandingPage} /> {/* View for logged-in (explore) and logged-out (showcase) */}
          {/* Meals */}
          <Route path="/meals/current" component={MealsOwned} /> {/* SIDEBAR - View all of your meals */}
          <Route path="/meals/saved" component={ComingSoon} /> {/* SIDEBAR - View favorite/saved meals - Coming soon! */}
          <Route path="/meals/:mealId" component={Meal} /> {/* View singular meal */}
          <Route path="/meals" component={Meals} /> {/* SIDEBAR - View all meals */}
          {/* Ingredients */}
          <Route path="/ingredients" component={Ingredients} /> {/* SIDEBAR - View all ingredients */}
          {/* Meal Planning */}
          <Route path="/meal-plan" component={ComingSoon} /> {/* SIDEBAR - Calendar for meals - Coming soon!*/}
          {/* User Profile */}
          <Route path="/following" component={ComingSoon} /> {/* NAVBAR - View followers/following after clicking text in profile dropdown - Coming soon! */}
          <Route path="/reviews" component={ComingSoon} /> {/* NAVBAR - View all reviews you made - Coming soon! */}
          <Route path="/messages" component={ComingSoon} /> {/* NAVBAR - View your messages - Coming soon! */}
          <Route path="/logout">
            <Redirect to="/"/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
