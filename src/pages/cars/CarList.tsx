
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { http } from '../../http/axios';
import { Car } from '../../models/Car';

interface Props {
  toggleUpdate: (value: boolean) => void;
  shouldUpdate: boolean;
}

export function CarList(props: Props) {
  const [cars, setCars] = useState<Car[] | undefined>(undefined);
  const { toggleUpdate, shouldUpdate } = props;

  useEffect(() => {
    if (shouldUpdate) {
      http.get('/cars')
        .then((response) => setCars(response.data.data))
        .then(() => toggleUpdate(false));
    }
  }, [shouldUpdate]);

  return (
    <div className='Car-list'>
      <ul className="list-group">
        <li className='list-group-heading list-group-item Car-list-item'>
          <label>Car Name</label>
          <label>Kilometers</label>
          <label>Availibility</label>
        </li>
        { Array.isArray(cars) ? (
          cars.map((car, id) => (
            <li className='list-group-item Car-list-item' key={ id } >
              <label className='name'>{ car.name }</label>
              <label className='kilometers'>{ car.kilometers } km</label>
              <label className={ `availability ${!car.available ? "unavailable" : ""}` }>{ car.available ? "available" : "unavailable" }</label>
            </li>
          ))) : undefined }
      </ul>
    </div>
  );
};


