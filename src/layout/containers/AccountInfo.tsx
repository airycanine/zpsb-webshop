import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";
import "../../styles/accountInfo.css";
import EntryEditor from "../components/entryEditor";
import { CustomerActionsDispatcher } from "../../store/dispatchers/customer/CustomerActionsDispatcher";
import EntryViewer from "../components/entryViewer";

interface PropsFromStore {
  user: Customer;
}
const AccountInfo = () => {
  const { user } = useSelector<Reducers, PropsFromStore>((state: Reducers) => {
    return {
      user: state.customerReducer.customer,
    };
  });
  const customerActionsDispatcher = new CustomerActionsDispatcher(
    useDispatch()
  );
  const [userInfo, setUserInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  useEffect(() => {
    setUserInfo({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setAddressInfo({
      city: `${user.address.city}`,
      street: user.address.street,
      voivodeship: user.address.voivodeship,
      zip: `${user.address.zip}`,
    });
  }, [user]);

  return (
    <div className=" info">
      {userInfo && (
        <>
          <div className="data">
            <div className="static-data">
              Dane stałe:
              {Object.entries(userInfo).map((entry: any) => (
                <EntryViewer entry={entry} />
              ))}
            </div>
            <div className="changeable-data">
              Dane zmienne:
              {Object.entries(addressInfo).map((entry: any) => (
                <EntryEditor
                  entry={entry}
                  onFocusLost={(value: string) => {
                    const changedAddress = {
                      ...user.address,
                      [entry[0]]: value,
                    };
                    // @ts-ignore
                    customerActionsDispatcher.updateCustomerAddress({
                      ...user,
                      address: { ...changedAddress },
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountInfo;
