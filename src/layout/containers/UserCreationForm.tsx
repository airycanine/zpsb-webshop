import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import CustomStepper from "../components/customStepper";
import { Button, Form } from "react-bootstrap";

interface StateProps {
  customerReducer: CustomerReducer;
}

const UserCreationForm = () => {
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

  useEffect(() => {
    customerActionsDispatcher.createCustomer({
      firstName: "Joe",
      lastName: "PAblo",
      email: "valat@o2.pl",
    });
  }, []);

  return (
    <div className="user-creation-form">
      {/*<CustomStepper />*/}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div className="text-right float-right">
          <Button variant="outline-success" type="submit">
            Login
          </Button>
        </div>
        <footer className="blockquote-footer">
          <cite title="Source Title">Don't have an account?</cite>
          <Button className="offset-1" variant="outline-warning">
            Register
          </Button>
        </footer>
      </Form>
    </div>
  );
};

export default UserCreationForm;
