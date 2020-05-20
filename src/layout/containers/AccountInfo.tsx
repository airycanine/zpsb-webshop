import React from "react";
import { useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";

interface PropsFromStore {
  user: Customer;
}
const AccountInfo = () => {
  const { user } = useSelector<Reducers, PropsFromStore>((state: Reducers) => {
    return {
      user: state.customerReducer.customer,
    };
  });

  return <div>Elo</div>;
};

export default AccountInfo;
