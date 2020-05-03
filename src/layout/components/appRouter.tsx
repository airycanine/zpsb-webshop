import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/App.css";
import NavigationBar from "../containers/NavigationBar";
import LoginForm from "../containers/LoginForm";
import AccountCreationForm from "../containers/AccountCreationForm";
import ReduxToastr from "react-redux-toastr";
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
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </>
  );
};

export default AppRouter;
