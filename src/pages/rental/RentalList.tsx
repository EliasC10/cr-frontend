
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { http } from '../../http/axios';
import { Rental } from '../../models/Rental';

interface Props {
  toggleUpdate: (value: boolean) => void;
  shouldUpdate: boolean;
}

export function RentalList(props: Props) {
  const [rental, setRental] = useState<Rental[] | undefined>(undefined);
  const { toggleUpdate, shouldUpdate } = props;

  useEffect(() => {
    if (shouldUpdate) {
      http.get('/rental')
        .then((response) => setRental(response.data.data))
        .then(() => toggleUpdate(false));
    }
  }, [shouldUpdate, toggleUpdate]);

  const closeRental = (rental: Rental) => {
    if (!rental.active) return;
    rental.active = false;
    http.put(`/rental/${rental.rentalId}`, rental)
      .then((response) => setRental(response.data.data))
      .then(() => toggleUpdate(true));
  };

  return (
    <div className='Rental-list'>
      <ul className="list-group">
        <li className='list-group-heading list-group-item Rental-list-item'>
          <label>Rental ID</label>
          <label>Car Name</label>
          <label>Customer Name</label>
          <label>Booked Kilometers</label>
          <label>Status</label>
          <label>Return</label>
        </li>
        { Array.isArray(rental) ? (
          rental.map((rental, id) => (
            <li className='list-group-item Rental-list-item' key={ id } >
              <label>{ rental.rentalId }</label>
              <label>{ rental.carName }</label>
              <label>{ rental.customerName }</label>
              <label>{ rental.kilometers }km</label>
              <label className={ `status ${!rental.active ? "closed" : ""}` }>{ rental.active ? "active" : "closed" }</label>
              { rental.active ? (
                <Button
                  className='Rental-list-return'
                  variant='secondary'
                  onClick={ () => closeRental(rental) }
                >
                  Close
                </Button>
              ) : <label> </label>
              }
            </li>
          ))) : undefined }
      </ul>
    </div>
  );
};


