import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';

import './styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />        
        <Routes>
          <Route exact path="/" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
