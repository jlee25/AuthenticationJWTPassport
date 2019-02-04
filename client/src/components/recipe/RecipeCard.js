import React, { Component } from 'react';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
  render() {
    const { title, image } = this.props
    const URL = title.replace(/\s+/g, "-").toLowerCase();
    return (
      <li className="cardContainer">
        <Link to={{ pathname: `/recipes/${URL}/info`, state: { state: this.props } }}>
          <img src={image} alt="Chicken Recipes" />
          <h2>{title}</h2>
        </Link>
      </li>
    )
  }
}

export default RecipeCard;
