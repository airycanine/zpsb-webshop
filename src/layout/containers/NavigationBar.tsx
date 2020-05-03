import React from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import CustomPopover from "../components/customPopover";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import UserCreationForm from "./UserCreationForm";

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
      <CustomPopover title={"Jakub Walat"} content={`ZPSB final project`}>
        <Navbar.Brand href="#home">
          <Navbar.Brand href="#home">Car Webshop</Navbar.Brand>
        </Navbar.Brand>
      </CustomPopover>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <NavDropdown title="Cars" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Show cars</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">
              Add a new car
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {customerReducer.loggedIn ? (
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              Contact Information
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Your offers</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
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
              <UserCreationForm />
            </VerticallyCenteredModal>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;
