import React from 'react';
import Header from './Header';
import '../assets/setup.css';

export default ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
