import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';
import Error from '../Error';
import './DisplayRecipes.css'

class DisplayRecipes extends Component {
  renderRecipes() {
    const { recipe } = this.props.recipe.recipe;
    if (recipe.count === 0) {
      return <Error />;
    } else {
      return recipe.hits.map((recipe, index) => {
        return (
          <RecipeCard 
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            calories={recipe.recipe.calories}
            dietLabels={recipe.recipe.dietLabels}
            healthLabels={recipe.recipe.healthLabels}
            ingredients={recipe.recipe.ingredients}
            url={recipe.recipe.url}
            key={index}
            serving={recipe.recipe.yield}
          />
        )
      })
    }
  }

  render() {
    return (
      <div className="displayContainer">
        {this.renderRecipes()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state
  }
} 

export default connect(mapStateToProps)(DisplayRecipes);
