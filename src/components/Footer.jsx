import React, { useEffect, useState } from "react";

const Footer = () => {
  const [goToTopVisible, setGoToTopVisible] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const goToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onScroll = (e) => {
      const documentScroll = e.target.documentElement.scrollTop;
      setScrollTop(documentScroll);
      setGoToTopVisible(documentScroll > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <footer className="text-muted mt-5">
      <div className="container">
        <p className="float-right">
          {goToTopVisible && (
            <a href="#" onClick={goToTop}>
              Back to top
            </a>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
