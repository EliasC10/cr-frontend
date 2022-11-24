
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
    <div>
      <div>
        <h4>Customers</h4>
        <ul className="list-group">
          { Array.isArray(customers) ? (
            customers.map((customer, id) => (
              <p key={ id } >
                { customer.name }
              </p>
            ))) : undefined }
        </ul>
      </div>
    </div>
  );
};


