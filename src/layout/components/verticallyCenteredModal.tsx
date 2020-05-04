import React, { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface VerticallyCenteredModalProps {
  children: ReactNode;
  title: ReactNode;
  size: "sm" | "lg" | "xl" | undefined;
  show: boolean;
  onHide: Function;
}

const VerticallyCenteredModal = (props: VerticallyCenteredModalProps) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default VerticallyCenteredModal;
