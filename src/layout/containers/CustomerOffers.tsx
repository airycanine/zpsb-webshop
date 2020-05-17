import React from "react";
import { Car } from "../../interfaces/CarInfo";
import { Customer } from "../../interfaces/CustomerInfo";

interface CustomerOffersProps {
  offers: Car[];
  customer: Customer;
}

const CustomerOffers = ({ offers, customer }: CustomerOffersProps) => {
  return <div>Offers</div>;
};

export default CustomerOffers;
