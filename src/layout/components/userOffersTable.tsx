import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Car } from "../../interfaces/CarInfo";

interface UserOffersTableProps {
  setSelectedOffer: Function;
  setModalShown: Function;
  cars: Car[];
  customerEmail: string;
}

const UserOffersTable = ({
  setSelectedOffer,
  setModalShown,
  cars,
  customerEmail,
}: UserOffersTableProps) => {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <Button onClick={() => setHidden(!hidden)}>Show offers</Button>
      {!hidden &&
        cars
          .filter((car) => car.seller === customerEmail && !car.buyer)
          .map((car) => (
            <tr className="text-center">
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedOffer(car);
                    setModalShown(true);
                  }}
                >
                  {car.model}-{car.licenceNumber}
                </Button>
              </td>
            </tr>
          ))}
    </>
  );
};
export default UserOffersTable;
