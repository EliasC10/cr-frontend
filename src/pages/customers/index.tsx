import { useState } from 'react';
import { CreateCustomerForm } from './CreateCustomerForm';
import { CustomerList } from './CustomerList';
import './style.scss';


export function Customers() {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  function toggleUpdate(value: boolean) {
    setShouldUpdate(value);
  }

  console.log(shouldUpdate);

  return (
    <div className='Customer'>
      <h2>Customers</h2>
      <CreateCustomerForm toggleUpdate={ toggleUpdate } />
      <CustomerList toggleUpdate={ toggleUpdate } shouldUpdate={ shouldUpdate } />
    </div>
  );
};
