import './App.scss';
import { Routes, Route, Link } from "react-router-dom";
import { Customers } from './pages/customers';
import { Cars } from './pages/cars';
import { Rental } from './pages/rental';
import { ButtonGroup, Button } from 'react-bootstrap';

export default function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Car Rental</h1>
      </div>
      <div className='App-content'>
        <nav className='App-navigation'>
          <ul>
            <li><Button variant="secondary"><Link to="/">Rental</Link></Button></li>
            <li><Button variant="secondary"><Link to="/customers">Customers</Link></Button></li>
            <li><Button variant="secondary"><Link to="/cars">Cars</Link></Button></li>
          </ul>
        </nav>
        <div className='App-page'>
          <Routes>
            <Route path="/" element={ <Rental /> } />
            <Route path="/customers" element={ <Customers /> } />
            <Route path="/cars" element={ <Cars /> } />
          </Routes>
        </div>
      </div>

    </div>
  );
}
