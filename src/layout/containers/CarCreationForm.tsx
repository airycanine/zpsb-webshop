import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pages } from "../../consts/Pages";

interface StateProps {}

interface CarCreationFormProps {
  hideModal: Function;
}

const CarCreationForm = ({ hideModal }: CarCreationFormProps) => {
  // const { customerReducer } = useSelector<Reducers, StateProps>(
  //   (state: Reducers) => {
  //     return {
  //       customerReducer: state.customerReducer,
  //     };
  //   }
  // );
  // const customerActionsDispatcher = new CustomerActionsDispatcher(
  //   useDispatch()
  // );

  return (
    <div className="car-creation-form">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <div className="mb-3">
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input isValid />
            <Form.File.Label data-browse="Button text">
              Custom file input
            </Form.File.Label>
            <Form.Control.Feedback type="valid">
              You did it!
            </Form.Control.Feedback>
          </Form.File>
        </div>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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

export default CarCreationForm;
