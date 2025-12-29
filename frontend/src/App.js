import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FinancialCalculator from '@/pages/FinancialCalculator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FinancialCalculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
