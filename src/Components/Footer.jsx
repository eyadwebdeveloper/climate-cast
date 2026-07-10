import React from 'react';

const Footer = ({ timeOfDay }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`app-footer ${timeOfDay}`}>
      <p className="footer-text">
        © {year} Built by{' '}
        <a
          href="https://www.eyadashraf.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Eyad Ashraf
        </a>
      </p>
    </footer>
  );
};

export default Footer;