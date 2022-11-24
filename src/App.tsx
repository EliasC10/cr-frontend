import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Customers } from './pages/customers';

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/cars">Cars</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/customers" element={ <Customers /> } />
        <Route path="/cars" element={ <Cars /> } />
      </Routes>
    </>
  );

  function Home() {
    return <h2>Home</h2>;
  }

  function Cars() {
    return <h2>Users</h2>;
  }
}
