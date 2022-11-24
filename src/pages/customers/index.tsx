import { useState } from 'react';
import { CreateCustomerForm } from './CreateCustomerForm';
import { CustomerList } from './CustomerList';


export function Customers() {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  function toggleUpdate(value: boolean) {
    setShouldUpdate(value);
  }

  console.log(shouldUpdate);

  return (
    <div>
      <CreateCustomerForm toggleUpdate={ toggleUpdate } />
      <CustomerList toggleUpdate={ toggleUpdate } shouldUpdate={ shouldUpdate } />
    </div>
  );
};
