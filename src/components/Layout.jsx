import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children}) => (
  <>
    <Header />
    <main role="main">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            { children }
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Layout;