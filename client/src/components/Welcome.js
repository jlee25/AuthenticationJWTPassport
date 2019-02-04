import React, { Component } from 'react';
import './Welcome.css';
import { connect } from 'react-redux';
import * as actions from "../actions";

class Welcome extends Component {
  state = {
    search: ""
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchRecipes(this.state.search);
    this.setState({
      search: ""
    });
  };
  render() {
    return (
      <div className="welcomeContainer">
        <div className="wrapper">
          <h1>Welcome to Jeff's Recipe Website!</h1>
          <h2>Over 10 Recipes to Choose From!</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              required
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Welcome);

