import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import StudentsProvider from './context/StudentsProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StudentsProvider>
        <App />
      </StudentsProvider>
    </Router>
  </React.StrictMode>
, document.getElementById('app'));