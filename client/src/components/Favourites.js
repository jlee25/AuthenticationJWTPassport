import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Favourites extends Component {
  render() {
    return <div>This is the favourites!</div>;
  }
}

export default requireAuth(Favourites);
