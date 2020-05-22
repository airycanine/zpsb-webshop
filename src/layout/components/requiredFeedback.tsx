import React from "react";
import { Form } from "react-bootstrap";

interface RequiredFeedbackProps {
  fieldName: string;
}
const RequiredFeedback = ({ fieldName }: RequiredFeedbackProps) => (
  <Form.Control.Feedback>{fieldName} is required.</Form.Control.Feedback>
);

export default RequiredFeedback;
