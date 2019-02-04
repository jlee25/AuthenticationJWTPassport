import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Error.css';

class Error extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return this.state.redirect ? <Redirect to="/" /> : <p className="error">Sorry, we could not find anything under that result. You will be redirect in 5 seconds</p>;
  }
}

export default Error;
