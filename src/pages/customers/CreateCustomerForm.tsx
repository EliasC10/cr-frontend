import React, { ChangeEvent, useEffect, useState } from 'react';
import { http } from '../../http/axios';
import { Customer } from '../../models/Customer';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './style.scss';

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
    <div className='Customer-form'>
      <FloatingLabel
        controlId="floatingInput"
        label="Create Customer"
        className="mb-3 Customer-form-input"
      >
        <Form.Control
          placeholder="Create Customer"
          aria-label="Create Customer"
          aria-describedby="basic-addon1"
          value={ inputValue }
          onChange={ onChangeInput }
        />
      </FloatingLabel>
      <Button
        className='Customer-form-submit'
        variant='primary'
        onClick={ createCustomer }
        disabled={ inputValue.length <= 0 } >
        Create
      </Button>
      <p className='Customer-form-result'>{ result }</p>
    </div>
  );
};
