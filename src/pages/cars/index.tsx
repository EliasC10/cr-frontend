import { useState } from 'react';
import { CreateCarForm } from './CreateCarForm';
import { CarList } from './CarList';
import './style.scss';


export function Cars() {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  function toggleUpdate(value: boolean) {
    setShouldUpdate(value);
  }

  console.log(shouldUpdate);

  return (
    <div className='Car'>
      <h2>Cars</h2>
      <CreateCarForm toggleUpdate={ toggleUpdate } />
      <CarList toggleUpdate={ toggleUpdate } shouldUpdate={ shouldUpdate } />
    </div>
  );
};
