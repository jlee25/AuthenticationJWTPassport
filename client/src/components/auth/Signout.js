import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../Error.css';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
      <p className="error">
        Sorry to see you go!!! If you like this app, please check out my website
        <a
          href="http://jeffleecodes.ca"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "green", textDecoration: "none" }}
        > here</a>
      </p>
    );
  }
}

export default connect(null, actions)(Signout);
