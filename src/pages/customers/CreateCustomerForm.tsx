import React, { ChangeEvent, useEffect, useState } from 'react';
import { http } from '../../http/axios';
import { Customer } from '../../models/Customer';

interface Props {
  toggleUpdate: (value: boolean) => void;
}

export function CreateCustomerForm(props: Props) {
  const [result, setResult] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const createCustomer = () => {
    http.post('/customers', { name: inputValue })
      .then(response => setResult(response.data.message))
      .then(() => setInputValue(""))
      .then(() => props.toggleUpdate(true));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Create Customer"
        value={ inputValue }
        onChange={ onChangeInput }
      />

      <button type="button" onClick={ createCustomer } disabled={ inputValue.length <= 0 } >
        Create
      </button>
      <p>{ result }</p>
    </div>
  );
};
