import React, { Component } from 'react';
import requireAuth from './requireAuth';
import './Favourites.css';

class Favourites extends Component {
  render() {
    return (
      <div className="favourites">Coming Soon!</div>
    )
  }
}

export default requireAuth(Favourites);
