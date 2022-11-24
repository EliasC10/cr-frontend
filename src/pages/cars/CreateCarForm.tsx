import React, { ChangeEvent, useEffect, useState } from 'react';
import { http } from '../../http/axios';
import { Car } from '../../models/Car';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './style.scss';

interface Props {
  toggleUpdate: (value: boolean) => void;
}

export function CreateCarForm(props: Props) {
  const [result, setResult] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const createCar = () => {
    http.post('/cars', { name: inputValue, kilometers: 0, available: "1" })
      .then(response => setResult(response.data.message))
      .then(() => setInputValue(""))
      .then(() => props.toggleUpdate(true));
  };

  return (
    <div className='Car-form'>
      <FloatingLabel
        controlId="floatingInput"
        label="Create Car"
        className="mb-3 Car-form-input"
      >
        <Form.Control
          placeholder="Create Car"
          aria-label="Create Car"
          aria-describedby="basic-addon1"
          value={ inputValue }
          onChange={ onChangeInput }
        />
      </FloatingLabel>
      <Button
        className='Car-form-submit'
        variant='primary'
        onClick={ createCar }
        disabled={ inputValue.length <= 0 } >
        Create
      </Button>
      <p className='Car-form-result'>{ result }</p>
    </div>
  );
};
