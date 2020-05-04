import React from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import CustomPopover from "../components/customPopover";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { Pages } from "../../consts/Pages";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import CarCreationForm from "./CarCreationForm";

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

  const customerActionsDispatcher = new CustomerActionsDispatcher(
    useDispatch()
  );

  return (
    <Navbar bg="light" expand="lg">
      <div className="ml-5">
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Link to="/">
          <CustomPopover title={"Jakub Walat"} content={`ZPSB final project`}>
            <Navbar.Brand>
              <Navbar.Brand>Car Webshop</Navbar.Brand>
            </Navbar.Brand>
          </CustomPopover>
        </Link>
      </div>
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to={Pages.HOME}>Home</Link>
          </Nav.Link>
          <NavDropdown title="Cars" id="basic-nav-dropdown">
            <NavDropdown.Item id="nav-dropdown-item">
              <Link to={Pages.CARS}>Show cars </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item id="nav-dropdown-item">
              <Button
                variant="outline-success"
                onClick={() => setCarModalShown(true)}
              >
                Add car
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="mr-lg-5">
          {customerReducer.loggedIn ? (
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item id="nav-dropdown-item">
                <Link to={Pages.ACCOUNT_INFORMATION}>Information</Link>
              </NavDropdown.Item>
              <NavDropdown.Item id="nav-dropdown-item">
                <Link to={Pages.ACCOUNT_OFFERS}>Your offers</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item id="nav-dropdown-item">
                <Button>Log out</Button>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Form>
              <Button
                variant="outline-success"
                onClick={() => setLoginModalShown(true)}
              >
                Log in
              </Button>

              <VerticallyCenteredModal
                title={"Provide credentials to log in"}
                show={loginModalShown}
                size={"sm"}
                onHide={() => setLoginModalShown(false)}
              >
                <LoginForm hideModal={setLoginModalShown} />
              </VerticallyCenteredModal>
              <VerticallyCenteredModal
                title={"Add your car offer"}
                show={carModalShown}
                size={"lg"}
                onHide={() => setCarModalShown(false)}
              >
                <CarCreationForm hideModal={setCarModalShown} />
              </VerticallyCenteredModal>
            </Form>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;
