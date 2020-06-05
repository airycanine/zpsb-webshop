import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";
import { AdminActionsDispatcher } from "../../store/dispatchers/admin/AdminActionsDispatcher";
import "../../styles/usersList.css";
import { Car } from "../../interfaces/CarInfo";
import VerticallyCenteredModal from "../components/verticallyCenteredModal";
import { CarActionsDispatcher } from "../../store/dispatchers/car/CarActionsDispatcher";

interface PropsFromStore {
  customers: Customer[];
  roles: string[];
  loggedCustomer: Customer;
  cars: Car[];
}
const UsersList = () => {
  const adminActionsDispatcher = new AdminActionsDispatcher(useDispatch());
  const carActionsDispatcher = new CarActionsDispatcher(useDispatch());
  const { customers, roles, loggedCustomer, cars } = useSelector<
    Reducers,
    PropsFromStore
  >((state: Reducers) => {
    return {
      customers: state.adminReducer.customers,
      roles: state.customerReducer.roles,
      loggedCustomer: state.customerReducer.customer,
      cars: state.carsReducer.cars,
    };
  });

  const [selectedOffer, setSelectedOffer] = useState<Car>({
    brand: "",
    buyer: undefined,
    currency: "",
    images: [],
    licenceNumber: "",
    model: "",
    price: 0,
    seller: undefined,
  });
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    adminActionsDispatcher.getCustomers();
  }, []);

  return (
    <>
      <VerticallyCenteredModal
        title={"User offer"}
        show={modalShown}
        onHide={() => setModalShown(false)}
        size="sm"
      >
        <div className="text-center">
          <div>Delete car with regplate {selectedOffer?.licenceNumber}?</div>
          <Button
            onClick={() => {
              carActionsDispatcher.deleteCar(selectedOffer);
              setModalShown(false);
            }}
            className="text-center mt-2"
            variant="danger"
          >
            YES
          </Button>
        </div>
      </VerticallyCenteredModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Active offers</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>City</th>
            <th>Zip-code</th>
            <th>Voivodeship</th>
            <th>Kill</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => customer.email !== loggedCustomer.email)
            .map((customer, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{customer.email}</td>
                <td>
                  {cars
                    .filter(
                      (car) => car.seller === customer.email && !car.buyer
                    )
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
                </td>

                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.address.street}</td>
                <td>{customer.address.city}</td>
                <td>{customer.address.zip}</td>
                <td>{customer.address.voivodeship}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      adminActionsDispatcher.deleteCustomer(customer);
                    }}
                  >
                    Remove user
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
