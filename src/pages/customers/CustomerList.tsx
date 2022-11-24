
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { http } from '../../http/axios';
import { Customer } from '../../models/Customer';

interface Props {
  toggleUpdate: (value: boolean) => void;
  shouldUpdate: boolean;
}

export function CustomerList(props: Props) {
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const { toggleUpdate, shouldUpdate } = props;

  useEffect(() => {
    if (shouldUpdate) {
      http.get('/customers')
        .then((response) => setCustomers(response.data.data))
        .then(() => toggleUpdate(false));
    }
  }, [shouldUpdate]);

  return (
    <div className='Customer-list'>
      <ul className="list-group">
        <li className='list-group-heading list-group-item Customer-list-item'>
          <label>Customer Name</label>
        </li>
        { Array.isArray(customers) ? (
          customers.map((customer, id) => (
            <li className='list-group-item' key={ id } >
              { customer.name }
            </li>
          ))) : undefined }
      </ul>
    </div>
  );
};


