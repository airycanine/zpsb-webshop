import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Reducers } from "../../store/reducers/reducers";
import { Customer } from "../../interfaces/CustomerInfo";
import "../../styles/accountInfo.css";

interface PropsFromStore {
  user: Customer;
}
const AccountInfo = () => {
  const { user } = useSelector<Reducers, PropsFromStore>((state: Reducers) => {
    return {
      user: state.customerReducer.customer,
    };
  });

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: `${user.address.city} ${user.address.zip}`,
      street: user.address.street,
      voivodeship: user.address.voivodeship,
    });
  }, [user]);

  return (
    <div className="text-center info">
      {userInfo &&
        Object.entries(userInfo).map((entry: any) => {
          return (
            <div className="entry">
              <span className="info-key">{entry[0]}</span>
              <span className="separator">=></span>
              <span className="info-value">
                {entry[1] && entry[1] != " " ? entry[1] : "not specified"}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default AccountInfo;
