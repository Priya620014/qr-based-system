import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { HashRouter as Router } from 'react-router-dom';

import AdminHome from './pages/AdminHome';
import TablePage from './pages/Home';
import MenuPage from './pages/Menu';
import OrderSuccess from './pages/orderSucess';
import Redirect from './pages/redirect';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/table/:id" element={<TablePage />} />
        <Route path="/table/:id/menu" element={<MenuPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/redirect-after-login" element={<Redirect />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        

  


      </Routes>
    </Router>
  );
}

export default App;
