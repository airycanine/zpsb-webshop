import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerActionStatuses,
  CustomerReducer,
} from "../../interfaces/CustomerInfo";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import { Button, Card, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import "../../styles/accountCreationForm.css";
import "../../styles/common.css";
import { useHistory } from "react-router-dom";

interface StateProps {
  customerReducer: CustomerReducer;
}

interface AccountCreationFormProps {
  onRegisterSuccess?: Function;
  routeToCarsOnSuccess?: boolean;
}

const CustomerRegistrationForm = ({
  onRegisterSuccess = () => {},
  routeToCarsOnSuccess = true,
}: AccountCreationFormProps) => {
  let history = useHistory();
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

  const [customer, setCustomer] = useState(customerReducer.customer);

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
      customerActionsDispatcher.createCustomer(customer, true);
    }
    setValidated(true);
  };

  useEffect(() => {
    customerReducer.loggedIn && onRegisterSuccess();

    if (routeToCarsOnSuccess) {
      customerReducer.loggedIn && history.push("/cars");
    }
  }, [customerReducer.loggedIn]);

  return (
    <Card className="account-creation-form">
      <Card.Body>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Forename</Form.Label>
              <Form.Control
                value={customer.firstName}
                onChange={(event) =>
                  setCustomer({ ...customer, firstName: event.target.value })
                }
                type="text"
                required
              />
              <Form.Control.Feedback type="invalid">
                First name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                value={customer.lastName}
                onChange={(event) =>
                  setCustomer({ ...customer, lastName: event.target.value })
                }
                type="text"
                required
              />
              <Form.Control.Feedback type="invalid">
                Last name is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={customer.email}
                  onChange={(event) =>
                    setCustomer({ ...customer, email: event.target.value })
                  }
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={customer.password}
                onChange={(event) =>
                  setCustomer({ ...customer, password: event.target.value })
                }
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={customer.address.street}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  address: { ...customer.address, street: event.target.value },
                })
              }
              placeholder="1234 Main St"
              required
            />
            <Form.Control.Feedback type="invalid">
              Street address is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={customer.address.city}
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, city: event.target.value },
                  })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                City is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Voivodeship</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    address: {
                      ...customer.address,
                      voivodeship: event.target.value,
                    },
                  })
                }
                value={customer.address.voivodeship}
              >
                <option>Zachodniopomorskie</option>
                <option>Different</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    address: {
                      ...customer.address,
                      zip: event.target.value,
                    },
                  })
                }
                value={customer.address.zip}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zip code is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I agree to everything"
              required
            />
          </Form.Group>
          <div className={"text-right"}>
            <Button
              size="lg"
              className="col-md-2 h button-for-spinner"
              variant="success"
              type="submit"
            >
              {customerReducer.lastStatus ==
              CustomerActionStatuses.CREATE_CUSTOMER_PENDING ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CustomerRegistrationForm;
