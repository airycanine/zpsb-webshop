import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../styles/App.css";
import NavigationBar from "../containers/NavigationBar";
import CustomerCreationForm from "../containers/CustomerCreationForm";
import ReduxToastr from "react-redux-toastr";
import { Pages } from "../../consts/Pages";
import CarOffersList from "../containers/CarOffersList";
import CustomerOffers from "../containers/CustomerOffers";

const AppRouter = () => {
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
          <Route path={Pages.ACCOUNT_OFFERS}>
            <CustomerOffers />
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
