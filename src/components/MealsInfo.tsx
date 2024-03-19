import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from './Header';
import { DrinksAll, MealDetails } from '../ApiAll/index';
import { DetailsDrink, DetailsMeal } from '../type';
import '../AllCss/Page.css';
import { INITIAL_STATE_MEALS } from '../utils/inial-state';
import renderRecomendations from '../utils/Recommendation';

export default function MealsInfo() {
  const [detailsMeal, setDetailsMeal] = useState<DetailsMeal[]>(INITIAL_STATE_MEALS);
  const [recommendation, setRecommendation] = useState<DetailsDrink[]>([]);
  const [finish, setFinish] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(recommendation);
  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await MealDetails(id);
        setDetailsMeal(data.meals);
        const recommendationData = await DrinksAll();
        setRecommendation(recommendationData.drinks);
        setLoading(false);
      }
    };
    fetchApi();
    setFavorite(favYorN());
    setInProgress(isRecipeInProgress());
    setLoading(false);
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

  function StartRecipe() {
    const startRecipe = isRecipeInProgress();
    const item = JSON.parse(localStorage.getItem('inProgressRecipes') as string) || {
      meals: {},
      drinks: {},
    };
    if (startRecipe) {
      navigate(`/meals/${id}/in-progress`);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...item.meals,
          [id as string]: ingredient.slice(0, ingredient.length).map((e) => e[1]),
        },
        drinks: {
          ...item.drinks,
        },
      }));
      setFinish(true);
      navigate(`/meals/${id}/in-progress`);
    }
  }
  const buttonLabel = inProgress ? 'Continue Recipe' : 'Start Recipe';
  function ShareRecipes() {
    const urlCopied = window.location.href;
    navigator.clipboard.writeText(urlCopied);
    setClear(true);
    setCopiedMsg('Link copied!');
    setTimeout(() => {
      setCopiedMsg('');
      setClear(false);
    }, 3000);
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
  // não tira o loading
  if (loading) {
    return (
      <h1>loading</h1>
    );
  }

  if (detailsMeal) {
    return (
      <>
        <Header title="Meal" searchOk profileOk />
        <div key={ detailsMeal[0].idMeal }>
          <div>
            <button
              onClick={ ShareRecipes }
              data-testid="share-btn"
            >
              <img
                src={ shareIcon }
                alt=""
              />
              Share
            </button>
            {copiedMsg && (
              <p className={ copiedMsg }>{ copiedMsg }</p>)}
          </div>
          <button
            onClick={ FavoriteRecipe }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt=""
              data-testid="favorite-btn"
            />
            Favorite
          </button>
          <h1 data-testid="recipe-title">{detailsMeal[0].strMeal}</h1>
          <img
            src={ detailsMeal[0].strMealThumb }
            alt={ detailsMeal[0].strMeal }
            data-testid="recipe-photo"
            width={ 350 }
          />
          <p data-testid="recipe-category">{detailsMeal[0].strCategory}</p>
          <div key={ detailsMeal[0].idMeal }>
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
            <p data-testid="instructions">{`${detailsMeal[0].strInstructions}`}</p>
            <iframe
              data-testid="video"
              title="video receita"
              width="800"
              height="443"
              src={ detailsMeal[0].strYoutube.replace('watch?v=', 'embed/') }
            />
            <div className="recipies-list">
              {renderRecomendations(recommendation)}
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
      </>
    );
  }
}
