import React from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <main role="main">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{children}</div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
