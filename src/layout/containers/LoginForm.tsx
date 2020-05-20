import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomerCredentials } from "../../interfaces/CustomerInfo";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pages } from "../../consts/Pages";

interface LoginFormProps {
  hideModal: Function;
}

const LoginForm = ({ hideModal }: LoginFormProps) => {
  const customerActionsDispatcher = new CustomerActionsDispatcher(
    useDispatch()
  );
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      customerActionsDispatcher.logCustomerIn(customerCredentials);
    }
    setValidated(true);
  };

  const [customerCredentials, setCustomerCredentials] = useState<
    CustomerCredentials
  >({ email: "", password: "" });

  return (
    <div className="user-creation-form">
      <Form onSubmit={handleSubmit}>
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
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your email.
          </Form.Control.Feedback>
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
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your password.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-right float-right">
          <Button size="lg" variant="outline-success" type="submit">
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
