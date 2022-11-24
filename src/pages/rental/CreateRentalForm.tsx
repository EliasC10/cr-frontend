import { ChangeEvent, useState } from 'react';
import { http } from '../../http/axios';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import './style.scss';
import { Customer } from '../../models/Customer';
import { Car } from '../../models/Car';

interface Props {
  toggleUpdate: (value: boolean) => void;
  customers: Customer[];
  cars: Car[];
}

export function CreateRentalForm(props: Props) {
  const [result, setResult] = useState<string>("");
  const [kmValue, setKmValue] = useState<string>("");
  const [carValue, setCarValue] = useState<number | undefined>(undefined);
  const [customerValue, setCustomerValue] = useState<number | undefined>(undefined);
  const { cars, customers } = props;

  const onChangeKm = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKmValue(value);
  };

  const onCarSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const value = e.target.value;
    setCarValue((Number(value)));
  };

  const onCustomerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCustomerValue((Number(value)));
  };

  const createRental = () => {
    http.post('/rental', { customerId: customerValue, carId: carValue, kilometers: kmValue })
      .then(response => setResult(response.data.message))
      .then(() => setKmValue(""))
      .then(() => setCarValue(undefined))
      .then(() => setCustomerValue(undefined))
      .then(() => props.toggleUpdate(true));
  };

  return (
    <div className='Rental-form'>
      <Form.Select
        className='Rental-form-select'
        value={ carValue }
        placeholder='Select Car'
        aria-label="Select Car"
        aria-describedby="basic-addon1"
        onChange={ (e) => onCarSelect(e) }
      >
        <option value={ undefined }>Select a Car</option>
        { Array.isArray(cars) ? (
          cars.map((car) => (
            <option value={ car.id } disabled={ !car.available } >
              { car.name }
            </option>
          ))) : undefined }
      </Form.Select>
      <Form.Select
        className='Rental-form-select'
        value={ customerValue }
        placeholder='Select Customer'
        aria-label="Select Customer"
        aria-describedby="basic-addon1"
        onChange={ (e) => onCustomerSelect(e) }
      >
        <option value={ undefined }>Select a Customer</option>
        { Array.isArray(customers) ? (
          customers.map((customer) => (
            <option value={ customer.id } >
              { customer.name }
            </option>
          ))) : undefined }
      </Form.Select>
      <div className='Rental-form-input'>
        <FloatingLabel
          controlId="floatingInput"
          label="Kilometer Distance"
          className="mb-3 Rental-form-input"
        >
          <Form.Control
            placeholder="Input Distance"
            aria-label="Input Distance"
            aria-describedby="basic-addon1"
            value={ kmValue }
            onChange={ onChangeKm }
          />
        </FloatingLabel>
      </div>
      <Button
        className='Rental-form-submit'
        variant='primary'
        onClick={ createRental }
        disabled={ kmValue.length <= 0 || !carValue || !customerValue } >
        Create Rental
      </Button>
      <p className='Rental-form-result'>{ result }</p>
    </div>
  );
};
