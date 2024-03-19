import { DetailsMeal } from '../type';
import '../AllCss/Recommendation.css';

function renderRecomendationsMeals(param: DetailsMeal[]) {
  return (
    <div className="carousel-card">
      {param && param.slice(0, 6).map((food, index) => (
        <div
          className="recipe-card"
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <h3 data-testid={ `${index}-recommendation-title` }>
            <p>{ food.strMeal }</p>
            <img
              className="image-recipes"
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
          </h3>
        </div>
      ))}
    </div>
  );
}

export default renderRecomendationsMeals;
