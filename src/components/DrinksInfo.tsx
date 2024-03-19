import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DrinkDetails, MealsAll } from '../ApiAll';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DetailsDrink, DetailsMeal } from '../type';
import '../AllCss/Page.css';
import { INITIAL_STATE_DRINKS } from '../utils/inial-state';
import renderRecomendationsMeals from '../utils/RecommendationMeals';

export default function DrinksInfo() {
  const [detailsDrink, setDetailsDrink] = useState<DetailsDrink[]>(INITIAL_STATE_DRINKS);
  const [recommendationMeals, setRecommendationMeals] = useState<DetailsMeal[]>([]);
  const [finish, setFinish] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await DrinkDetails(id);
        setDetailsDrink(data.drinks);
        const recommendationData = await MealsAll();
        setRecommendationMeals(recommendationData.meals);
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

  function StartRecipe() {
    const startRecipe = isRecipeInProgress();
    const item = JSON.parse(localStorage.getItem('inProgressRecipes') as string) || {
      meals: {},
      drinks: {},
    };
    if (startRecipe) {
      navigate(`/drinks/${id}/in-progress`);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...item.meals,
        },
        drinks: {
          ...item.drinks,
          [id as string]: ingredient.slice(0, ingredient.length - 1).map((e) => e[1]),
        },
      }));
      setFinish(true);
      navigate(`/drinks/${id}/in-progress`);
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
  // não tira o loading
  if (loading) {
    return (
      <h1>loading</h1>
    );
  }

  return (
    <>
      <Header title="Drinks" searchOk profileOk />
      <div key={ detailsDrink[0].idDrink }>
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
        <h1 data-testid="recipe-title">{detailsDrink[0].strDrink}</h1>
        <img
          src={ detailsDrink[0].strDrinkThumb }
          alt={ detailsDrink[0].strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">{detailsDrink[0].strAlcoholic}</p>
        <div key={ detailsDrink[0].idDrink }>
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
          <p data-testid="instructions">{`${detailsDrink[0].strInstructions}`}</p>

          <div className="recipies-list">
            {renderRecomendationsMeals(recommendationMeals)}
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
