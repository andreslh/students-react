import React from 'react';

const Footer = () => {
  const goToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  return (
    <footer className="text-muted mt-5">
      <div className="container">
        <p className="float-right">
          <a href="#" onClick={goToTop}>Back to top</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
