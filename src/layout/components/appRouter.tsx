import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/App.css";
import NavigationBar from "../containers/NavigationBar";
import UserCreationForm from "../containers/UserCreationForm";

const AppRouter = () => {
  return (
    <>
      <Router>
        <NavigationBar />

        <Switch>
          <Route path="/about">
            <UserCreationForm />
          </Route>
          <Route path="/users">
            {" "}
            <UserCreationForm />
          </Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
