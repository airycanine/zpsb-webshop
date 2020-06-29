import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Currencies } from "../../consts/Currencies";
import { Car } from "../../interfaces/CarInfo";

interface CurrencyProps {
  onCurrencyChange: Function;
  onPriceChange: Function;
}

const CurrencyDropdown = ({
  onCurrencyChange,
  onPriceChange,
}: CurrencyProps) => {
  const [currency, setCurrency] = useState("PLN");
  const [price, setPrice] = useState("");
  useEffect(() => {
    onCurrencyChange(currency);
  }, [currency]);

  useEffect(() => {
    onPriceChange(price);
  }, [price]);

  return (
    <InputGroup>
      <FormControl
        placeholder="Price"
        aria-label="price"
        aria-describedby="basic-addon2"
        value={price}
        onChange={(event) => {
          if (!isNaN(Number(event.target.value))) {
            setPrice(event.target.value);
          }
        }}
      />
      <DropdownButton
        as={InputGroup.Append}
        variant="outline-secondary"
        title={currency}
        id="input-group-dropdown-2"
        className="width: mr-auto"
      >
        <Dropdown.Item onClick={() => setCurrency(Currencies.PLN)}>
          {Currencies.PLN}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCurrency(Currencies.DOLLAR)}>
          {Currencies.DOLLAR}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCurrency(Currencies.EURO)}>
          {Currencies.EURO}
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
};
export default CurrencyDropdown;
