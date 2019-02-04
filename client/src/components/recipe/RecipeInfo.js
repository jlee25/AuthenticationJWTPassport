import React, { Component } from 'react';
import './RecipeInfo.css';

class RecipeInfo extends Component {
  renderdietLabels() {
    const { dietLabels } = this.props.location.state.state;
    return dietLabels.map((label, index) => {
      return (
        <li key={index}>{label}</li>
      )
    })
  }

  renderhealthLabels() {
    const { healthLabels } = this.props.location.state.state;
    return healthLabels.map((label, index) => {
      return (
      <li key={index}>{label}</li>
      )
    })
  }

  renderIngredients() {
    const { ingredients } = this.props.location.state.state;
    return ingredients.map((ingredient, index) => {
      return (
        <li key={index}>{ingredient.text}</li>
      )
    })
  }

  render() {
    console.log(this.props.location.state.state);
    const { title, calories, serving, image, url } = this.props.location.state.state
    return (
      <div className="infoContainer">
        <h1>{title}</h1>
        <div className="infoTop">
          <div className="facts">
            <h3>Calories: {calories.toFixed(0)}</h3>
            <h3>Servings: {serving}</h3>
            <div className="labels">
              <h3>Diet Labels:</h3>
              <ul>{this.renderdietLabels()}</ul>
            </div>
            <div className="labels">
              <h3>Health Labels:</h3>
              <ul>{this.renderhealthLabels()}</ul>
            </div>
          </div>
          <div className="imageContainer">
            <img src={image} alt="Selected Recipe" />
          </div>
        </div>
        <h2>Ingredients</h2>
        <div className="ingredients">
          <ul>{this.renderIngredients()}</ul>
        </div>
        <p className="directions">
          For directions on the recipe, please click<a href={url} target="_blank" rel="noopener noreferrer"> here</a>
        </p>
      </div>
    );
  }
}

export default RecipeInfo;
