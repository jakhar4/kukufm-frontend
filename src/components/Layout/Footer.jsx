import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer_container');
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      footer.classList.toggle('footer_visible', isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="footer_container">
      <div className="footer_content">" Made with 💗 by Mahendra Jakhar "</div>
    </div>
  );
};

export default Footer;
