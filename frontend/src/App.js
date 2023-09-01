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
        <div className="sidebar fixed w-60 bg-white">Active Sidebar</div>
      ) : (
        <div className="w-0">
          Inactive Sidebar
        </div>
      )}
    </div>
  );
}

export default App;
