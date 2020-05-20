import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../styles/App.css";
import NavigationBar from "../containers/NavigationBar";
import CustomerCreationForm from "../containers/CustomerCreationForm";
import ReduxToastr from "react-redux-toastr";
import { Pages } from "../../consts/Pages";
import CarOffersList from "../containers/CarOffersList";
import CustomerOffers from "../containers/CustomerOffers";
import AccountInfo from "../containers/AccountInfo";
import { useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";

interface PropsFromStore {
  user: Customer;
  loggedIn: boolean;
}
const AppRouter = () => {
  const { user, loggedIn } = useSelector<Reducers, PropsFromStore>(
    (state: Reducers) => {
      return {
        user: state.customerReducer.customer,
        loggedIn: state.customerReducer.loggedIn,
      };
    }
  );
  const [storageUser, setStorageUser] = useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem("user"))
  );

  const [authorized, setAuthorized] = useState(
    storageUser && storageUser.email === user.email
  );

  useEffect(() => {
    if (loggedIn) {
      setAuthorized(true);
    } else {
      setAuthorized(storageUser && storageUser.email === user.email);
    }
  }, [user]);
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path={Pages.REGISTER_FORM}>
            <CustomerCreationForm />
          </Route>
          <Route path={Pages.CARS}>
            <CarOffersList />
          </Route>
          {authorized === true && (
            <Route path={Pages.ACCOUNT_OFFERS}>
              <CustomerOffers />
            </Route>
          )}
          {authorized === true && (
            <Route path={Pages.ACCOUNT_INFORMATION}>
              <AccountInfo />
            </Route>
          )}
          <Route path={"/"}>
            <CarOffersList />
          </Route>
          <Route component={() => <h1>Not found!</h1>} />
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
