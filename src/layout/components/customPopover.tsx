import React from "react";
import { Navbar, OverlayTrigger, Popover } from "react-bootstrap";

interface PopoverProps {
  children: any;
  title: string;
  content: string;
}

const CustomPopover = ({ children, title, content }: PopoverProps) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      {children}
    </OverlayTrigger>
  );
};

export default CustomPopover;
