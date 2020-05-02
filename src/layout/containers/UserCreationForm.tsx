import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerReducer } from "../../interfaces/CustomerInfo";
import { Reducers } from "../../store/reducers/reducers";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";

interface StateProps {
  customerReducer: CustomerReducer;
}

const UserCreationForm = () => {
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

  useEffect(() => {
    customerActionsDispatcher.createCustomer({
      firstName: "Joe",
      lastName: "PAblo",
      email: "valat@o2.pl",
    });
  }, []);

  console.log(customerReducer);
  return <div className="user-creation-form">dupolost</div>;
};

export default UserCreationForm;
