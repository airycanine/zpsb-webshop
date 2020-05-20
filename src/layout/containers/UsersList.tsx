import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";
import { AdminActionsDispatcher } from "../../store/dispatchers/admin/AdminActionsDispatcher";
import "../../styles/usersList.css";

interface PropsFromStore {
  customers: Customer[];
  roles: string[];
  loggedCustomer: Customer;
}
const UsersList = () => {
  const adminActionsDispatcher = new AdminActionsDispatcher(useDispatch());
  const { customers, roles, loggedCustomer } = useSelector<
    Reducers,
    PropsFromStore
  >((state: Reducers) => {
    return {
      customers: state.adminReducer.customers,
      roles: state.customerReducer.roles,
      loggedCustomer: state.customerReducer.customer,
    };
  });
  useEffect(() => {
    adminActionsDispatcher.getCustomers();
  }, []);
  console.log(customers);
  return (
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
              <td>offers</td>
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
  );
};

export default UsersList;
