import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header  = () => {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <strong>Students</strong>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
