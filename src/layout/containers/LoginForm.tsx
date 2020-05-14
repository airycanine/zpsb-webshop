import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerCredentials,
  CustomerReducer,
} from "../../interfaces/CustomerInfo";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pages } from "../../consts/Pages";

interface StateProps {
  customerReducer: CustomerReducer;
}

interface LoginFormProps {
  hideModal: Function;
}

const LoginForm = ({ hideModal }: LoginFormProps) => {
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

  const [customerCredentials, setCustomerCredentials] = useState<
    CustomerCredentials
  >({ email: "", password: "" });

  return (
    <div className="user-creation-form">
      {/*<CustomStepper />*/}
      <Form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={customerCredentials.email}
            onChange={(event) =>
              setCustomerCredentials({
                ...customerCredentials,
                email: event.target.value,
              })
            }
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={customerCredentials.password}
            onChange={(event) =>
              setCustomerCredentials({
                ...customerCredentials,
                password: event.target.value,
              })
            }
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <div className="text-right float-right">
          <Button
            onClick={() => {
              customerActionsDispatcher.logCustomerIn(customerCredentials);
              // hideModal();
            }}
            size="lg"
            variant="outline-success"
            type="submit"
          >
            Login
          </Button>
        </div>
        <footer className="blockquote-footer">
          <cite title="Source Title">Don't have an account?</cite>
          <Link to={Pages.REGISTER_FORM}>
            <Button
              onClick={() => {
                hideModal();
              }}
              className="offset-1"
              variant="outline-warning"
            >
              Register
            </Button>
          </Link>
        </footer>
      </Form>
    </div>
  );
};

export default LoginForm;
