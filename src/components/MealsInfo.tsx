import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import shareIcon from '../images/shareIcon.png';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';
import Header from './Header';
import { DrinksAll, MealDetails } from '../ApiAll/index';
import { DetailsDrink, DetailsMeal } from '../type';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../AllCss/MealsInfo.css';

const INITIAL_STATE = [
  {
    idMeal: '',
    strMeal: '',
    strMealThumb: '',
    strCategory: '',
    strArea: '',
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

export default function MealsInfo() {
  const [detailsMeal, setDetailsMeal] = useState<DetailsMeal[]>(INITIAL_STATE);
  const [recommendation, setRecommendation] = useState<DetailsDrink[]>([]);
  const [finish, setFinish] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await MealDetails(id);
        setDetailsMeal(data.meals);
        const recommendationData = await DrinksAll();
        setRecommendation(recommendationData.drinks);
      }
    };
    fetchApi();
    setFavorite(favYorN());
    setInProgress(isRecipeInProgress());
  }, [id]);
  const isRecipeInProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    return inProgressRecipes.meals && inProgressRecipes.meals[id as string];
  };
  const ingredient = detailsMeal
  && Object.entries(detailsMeal[0])
    .filter((i) => i[0]
      .startsWith('strIngredient')).filter((i) => i[1] !== null && i[1] !== '');
  const measure = detailsMeal
  && Object.entries(detailsMeal[0])
    .filter((i) => i[0]
      .startsWith('strMeasure')).filter((i) => i[1] !== null && i[1] !== '');
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  function StartRecipe() {
    setInProgress(true);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        [id as string]: [],
      },
    }));
    setFinish(true);
    navigate(`/meals/${id}/in-progress`);
  }
  const buttonLabel = inProgress ? 'Continue Recipe' : 'Start Recipe';
  function ShareRecipes() {
    const urlCopied = window.location.href;
    try {
      navigator.clipboard.writeText(urlCopied);
      setClear(true);
      setCopiedMsg('Link copied!');
      setTimeout(() => {
        setCopiedMsg('');
        setClear(false);
      }, 3000); // Após 3 segundos msg some
    } catch (error) {
      console.error('Error copying', error);
    }
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
        id: detailsMeal[0].idMeal,
        type: 'meal',
        nationality: detailsMeal[0].strArea || '',
        category: detailsMeal[0].strCategory || '',
        alcoholicOrNot: '',
        name: detailsMeal[0].strMeal,
        image: detailsMeal[0].strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...storeFavorite, favoriteRecipes]));
      setFavorite(true);
    }
  }
  if (detailsMeal) {
    return (
      <section className="body-container-meals">
        <Header title="Meal" searchOk profileOk />
        <div key={ detailsMeal[0].idMeal }>
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
            {copiedMsg && (
              <p className={ copiedMsg }>{ copiedMsg }</p>)}
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
            <h1 className="title" data-testid="recipe-title">{detailsMeal[0].strMeal}</h1>
            <img
              src={ detailsMeal[0].strMealThumb }
              alt={ detailsMeal[0].strMeal }
              data-testid="recipe-photo"
              className="recipe-photo"
            />
            <p data-testid="recipe-category">{detailsMeal[0].strCategory}</p>
            <p className="title-container">Ingredients:</p>
            <div key={ detailsMeal[0].idMeal } className="ingredient-container">
              {
              ingredient.map((meals, cont) => (
                <div key={ cont }>
                  <p
                    data-testid={ `${cont}-ingredient-name-and-measure` }
                  >
                    {meals[1]}
                    {measure[cont][1]}
                  </p>
                </div>
              ))
              }
            </div>
            <p className="title-container">Instructions:</p>
            <div className="intructions-container">
              <p data-testid="instructions">{`${detailsMeal[0].strInstructions}`}</p>
              <iframe
                data-testid="video"
                title="video receita"
                className="video-recipes"
                src={ detailsMeal[0].strYoutube.replace('watch?v=', 'embed/') }
                allowFullScreen
                allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <p className="title-container">Recommendations:</p>
            <div className="carousel-card">
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
                      <p>{ food.strDrink }</p>
                      <img
                        className="image-recipes"
                        src={ food.strDrinkThumb }
                        alt={ food.strDrink }
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
        </div>
      </section>
    );
  }
}
