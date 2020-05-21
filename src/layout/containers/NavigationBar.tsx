import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import CustomPopover from "../components/customPopover";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { Pages } from "../../consts/Pages";
import CarCreationForm from "./CarCreationForm";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import "../../styles/navbar.css";
import { Roles } from "../../consts/Roles";

interface StateProps {
  customerReducer: CustomerReducer;
}

const NavigationBar = () => {
  const [loginModalShown, setLoginModalShown] = React.useState(false);
  const [carModalShown, setCarModalShown] = React.useState(false);

  const { customerReducer } = useSelector<Reducers, StateProps>(
    (state: Reducers) => {
      return {
        customerReducer: state.customerReducer,
      };
    }
  );
  const [storageUser, setStorageUser] = useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem("user"))
  );

  const customerActionsDispatcher = new CustomerActionsDispatcher(
    useDispatch()
  );
  return (
    <Navbar bg="light" expand="lg">
      <div className="ml-5">
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Link to="/cars">
          <CustomPopover title={"Jakub Walat"} content={`ZPSB final project`}>
            <Navbar.Brand>
              <Navbar.Brand className="webshop">Car Webshop</Navbar.Brand>
            </Navbar.Brand>
          </CustomPopover>
        </Link>
      </div>
      <Navbar.Collapse className="nicer-font" id="basic-navbar-nav ">
        <Nav className="mr-auto">
          <Nav.Link className="home">
            <Link to={"/"}> Home</Link>
          </Nav.Link>
          <NavDropdown title="Cars" id="basic-nav-dropdown">
            <NavDropdown.Item id="nav-dropdown-item">
              <Link to={Pages.CARS}>Show cars </Link>
            </NavDropdown.Item>
            {customerReducer.loggedIn && (
              <>
                <NavDropdown.Divider />

                <NavDropdown.Item id="nav-dropdown-item">
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setCarModalShown(true);
                    }}
                  >
                    Add car
                  </Button>
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
        <div className="mr-lg-5">
          {customerReducer.loggedIn ? (
            <>
              {customerReducer.roles.includes(Roles.ADMIN) && (
                <Nav.Link className="home">
                  <Link to={Pages.USERS_LIST}>Users</Link>
                </Nav.Link>
              )}
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item id="nav-dropdown-item">
                  <Link to={Pages.ACCOUNT_INFORMATION}>Information</Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="nav-dropdown-item">
                  <Link to={Pages.ACCOUNT_OFFERS}>Your offers</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id="nav-dropdown-item">
                  <Link to={Pages.CARS}>
                    <Button
                      onClick={() => {
                        customerActionsDispatcher.logCustomerOut();
                        localStorage.removeItem("user");
                      }}
                    >
                      Log out
                    </Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <VerticallyCenteredModal
                title={"Add your car offer"}
                show={carModalShown}
                size={"lg"}
                onHide={() => setCarModalShown(false)}
              >
                <CarCreationForm hideModal={setCarModalShown} />
              </VerticallyCenteredModal>
            </>
          ) : (
            <Form>
              <Button
                variant="outline-success"
                onClick={() => setLoginModalShown(true)}
              >
                Log in
              </Button>

              <VerticallyCenteredModal
                title={"Provide credentials"}
                show={loginModalShown}
                size={"sm"}
                onHide={() => setLoginModalShown(false)}
              >
                <LoginForm hideModal={setLoginModalShown} />
              </VerticallyCenteredModal>
            </Form>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;
