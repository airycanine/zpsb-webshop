import React from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import CustomPopover from "../components/customPopover";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

interface StateProps {
  customerReducer: CustomerReducer;
}

const NavigationBar = () => {
  const [modalShow, setModalShow] = React.useState(false);

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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Link to="/">
        <CustomPopover title={"Jakub Walat"} content={`ZPSB final project`}>
          <Navbar.Brand>
            <Navbar.Brand>Car Webshop</Navbar.Brand>
          </Navbar.Brand>
        </CustomPopover>
      </Link>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/home">Home</Link>
          </Nav.Link>
          <NavDropdown title="Cars" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/cars">Show cars </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/cars/new">Add a new car </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {customerReducer.loggedIn ? (
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/account/contact">Contact Information</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/account/offers">Your offers</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Log out</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Form>
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              Log in
            </Button>

            <VerticallyCenteredModal
              title={"Provide credentials to log in"}
              show={modalShow}
              onHide={() => setModalShow(false)}
            >
              <LoginForm />
            </VerticallyCenteredModal>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;
