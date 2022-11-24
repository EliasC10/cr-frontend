import { useEffect, useState } from 'react';
import { http } from '../../http/axios';
import { CreateRentalForm } from './CreateRentalForm';
import { RentalList } from './RentalList';
import './style.scss';


export function Rental() {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);


  function toggleUpdate(value: boolean) {
    setShouldUpdate(value);
  }

  useEffect(() => {
    http.get('/customers')
      .then((response) => setCustomers(response.data.data));
  }, []);

  useEffect(() => {
    http.get('/cars')
      .then((response) => setCars(response.data.data));
  }, [shouldUpdate]);

  return (
    <div className='Rental'>
      <h2>Rental</h2>
      <CreateRentalForm toggleUpdate={ toggleUpdate } customers={ customers } cars={ cars } />
      <RentalList toggleUpdate={ toggleUpdate } shouldUpdate={ shouldUpdate } />
    </div>
  );
};
