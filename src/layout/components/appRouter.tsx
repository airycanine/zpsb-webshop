import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/App.css";
import NavigationBar from "../containers/NavigationBar";
import LoginForm from "../containers/LoginForm";
import AccountCreationForm from "../containers/AccountCreationForm";

const AppRouter = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/about">
            <LoginForm />
          </Route>
          <Route path="/users">
            {" "}
            <LoginForm />
          </Route>
          <Route path="/account-creation">
            <AccountCreationForm />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
