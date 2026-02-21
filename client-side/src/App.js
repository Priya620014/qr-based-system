import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { HashRouter as Router } from 'react-router-dom';

import TablePage from './pages/Home';
import MenuPage from './pages/Menu';
import OrderSuccess from './pages/orderSucess';
import Redirect from './pages/redirect';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/table/:id" element={<TablePage />} />
        <Route path="/table/:id/menu" element={<MenuPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/redirect-after-login" element={<Redirect />} />
        

  


      </Routes>
    </Router>
  );
}

export default App;
