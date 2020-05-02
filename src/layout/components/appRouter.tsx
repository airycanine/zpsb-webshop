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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <UserCreationForm />
          </Route>
          <Route path="/users">
            {" "}
            <UserCreationForm />
          </Route>
          <Route path="/">
            <UserCreationForm />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
