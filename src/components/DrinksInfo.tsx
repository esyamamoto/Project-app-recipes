import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { DrinkDetails, MealsAll } from '../ApiAll';
import Header from './Header';
import shareIcon from '../images/shareIcon.png';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';
import { DetailsDrink, DetailsMeal } from '../type';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../AllCss/DrinksInfo.css';

const INITIAL_STATE = [
  {
    idDrink: '',
    strDrink: '',
    strDrinkThumb: '',
    strCategory: '',
    strArea: '',
    strTags: '',
    strAlcoholic: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strInstructions: '',
    strYoutube: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',

  },
];

export default function DrinksInfo() {
  const [detailsDrink, setDetailsDrink] = useState<DetailsDrink[]>(INITIAL_STATE);
  const [recommendation, setRecommendation] = useState<DetailsMeal[]>([]);
  const [finish, setFinish] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await DrinkDetails(id);
        setDetailsDrink(data.drinks);
        const recommendationData = await MealsAll();
        setRecommendation(recommendationData.meals);
      }
    };
    fetchApi();
    setFavorite(favYorN());
    setInProgress(isRecipeInProgress());
  }, [id]);

  const isRecipeInProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    return inProgressRecipes.drinks && inProgressRecipes.drinks[id as string];
  };
  const ingredient = detailsDrink
  && Object.entries(detailsDrink[0])
    .filter((i) => i[0]
      .startsWith('strIngredient')).filter((i) => i[1] !== null && i[1] !== '');

  const measure = detailsDrink
  && Object.entries(detailsDrink[0])
    .filter((i) => i[0]
      .startsWith('strMeasure'));
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  function StartRecipe() {
    setInProgress(true);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        [id as string]: [],
      },
    }));
    setFinish(true);
    navigate(`/drinks/${id}/in-progress`);
  }
  const buttonLabel = inProgress ? 'Continue Recipe' : 'Start Recipe';
  function ShareRecipes() {
    const urlCopied = window.location.href;
    navigator.clipboard.writeText(urlCopied)
      .then(() => {
        setClear(true);
        const message = document.getElementById('share-message');
        if (message) {
          message.textContent = 'Link copied!';
          setTimeout(() => {
            message.textContent = '';
            setClear(false);
          }, 3000);
        }
      });
  }
  function favYorN() {
    const storeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return storeFavorite.some((recipe: any) => recipe.id === id);
  }
  function FavoriteRecipe() {
    const storeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favYorN()) {
      const setFavNew = storeFavorite.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(setFavNew));
      setFavorite(false);
    } else {
      const favoriteRecipes = {
        id: detailsDrink[0].idDrink,
        type: 'drink',
        nationality: detailsDrink[0].strArea || '',
        category: detailsDrink[0].strCategory || '',
        alcoholicOrNot: detailsDrink[0].strAlcoholic || '',
        name: detailsDrink[0].strDrink,
        image: detailsDrink[0].strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...storeFavorite, favoriteRecipes]));
      setFavorite(true);
    }
  }

  return (
    <section className="body-container">
      <Header title="Drinks" searchOk profileOk />
      <div key={ detailsDrink[0].idDrink }>
        <div className="container-button">
          <button
            className="favorite-button"
            onClick={ ShareRecipes }
            data-testid="share-btn"
          >
            Share
            <img
              className="image-favorite"
              src={ shareIcon }
              alt=""
              data-testid="share-btn"
            />
          </button>
          {clear && <div id="share-message" />}
        </div>
        <button
          className="favorite-button"
          data-testid="favorite-btn"
          onClick={ FavoriteRecipe }
        >
          Favorite
          <img
            className="image-favorite"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="ingredients-container">
        <h1 className="title" data-testid="recipe-title">{detailsDrink[0].strDrink}</h1>
        <img
          src={ detailsDrink[0].strDrinkThumb }
          alt={ detailsDrink[0].strDrink }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <p data-testid="recipe-category">{detailsDrink[0].strAlcoholic}</p>
        <p className="title-container">Ingredients:</p>
        <div key={ detailsDrink[0].idDrink } className="ingredient-container">
          {
              ingredient.map((drinks, cont) => (
                <div key={ cont }>
                  <p
                    data-testid={ `${cont}-ingredient-name-and-measure` }
                  >
                    {drinks[1]}
                    {measure[cont][1]}
                  </p>
                </div>
              ))
          }
        </div>

        <p className="title-container">Instructions:</p>
        <div className="intructions-container">
          <p data-testid="instructions">{`${detailsDrink[0].strInstructions}`}</p>
        </div>

        <p className="title-container">Recommendations:</p>
        <div className="carousel-container">
          <Slider
            { ...settings }
            dots={ false }
            infinite={ false }
            slidesToShow={ 2 }
            slidesToScroll={ 1 }
          >
            { recommendation.slice(0, 6).map((food, index) => (
              <div
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
          </Slider>
        </div>
        <button
          data-testid="start-recipe-btn"
          onClick={ StartRecipe }
          className="buttonStart"
        >
          { buttonLabel }
        </button>
      </div>
</section>
  );
}
