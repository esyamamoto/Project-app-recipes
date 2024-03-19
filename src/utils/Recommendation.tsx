import { DetailsDrink } from '../type';
import '../AllCss/Recommendation.css';

function renderRecomendations(param: DetailsDrink[]) {
  return (
    <div className="carousel-card">
      {param && param.slice(0, 6).map((food, index) => (
        <div
          className="recipe-card"
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <h3 data-testid={ `${index}-recommendation-title` }>
            <p>{food.strDrink}</p>
            <img
              className="image-recipes"
              src={ food.strDrinkThumb }
              alt={ food.strDrink }
            />
          </h3>
        </div>
      ))}
    </div>
  );
}

export default renderRecomendations;
