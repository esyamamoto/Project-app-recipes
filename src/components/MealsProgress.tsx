import { useContext, useEffect, useState } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import { MealDetails } from '../ApiAll';
import { DetailsMeal } from '../type';
import { INITIAL_STATE_MEALS } from '../utils/inial-state';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import LabelIngrediente from '../utils/ingrediente';
import FoodContext from '../Context/FoodContext';

export default function MealsProgress() {
  const { setLocalItems, localItems } = useContext(FoodContext);
  const [progressRecipe, setProgressRecipe] = useState<
  DetailsMeal[]>(INITIAL_STATE_MEALS);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedMsg, setCopiedMsg] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  function response(data:any) {
    const item = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
    const ingredient = data
  && Object.entries(data[0])
    .filter((i) => i[0]
      .startsWith('strIngredient')).filter((i) => i[1] !== null && i[1] !== '');
    if (!item) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [id as string]: ingredient.slice(0, ingredient.length).map((e:any) => e[1]),
        },
        drinks: {
        },
      }));
    }
    setLocalItems(JSON.parse(localStorage.getItem(('inProgressRecipes')) as string));
  }

  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await MealDetails(id);
        setProgressRecipe(data.meals);
        response(data.meals);
        setLoading(false);
      }
    };
    setLocalItems(JSON.parse(localStorage.getItem(('inProgressRecipes')) as string));
    fetchApi();
    setFavorite(favYorN());
    setLoading(false);
  }, [id]);

  if (!id) {
    return console.log('não tem id');
  }
  if (!localItems) {
    return console.log('');
  }

  function ShareRecipes() {
    const urlCopied = `${window
      .location.origin}/meals/${progressRecipe[0].idMeal}`;
    navigator.clipboard.writeText(urlCopied);
    setClear(true);
    setCopiedMsg('Link copied!');
    setTimeout(() => {
      setCopiedMsg('');
      setClear(false);
    }, 3000);
  }
  // ve se ta ta favoritada a receita
  function favYorN() {
    // verifica se ja tem a receita add como fav no localStorage
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
        id: progressRecipe[0].idMeal,
        type: 'meal',
        nationality: progressRecipe[0].strArea || '',
        category: progressRecipe[0].strCategory || '',
        alcoholicOrNot: '',
        name: progressRecipe[0].strMeal,
        image: progressRecipe[0].strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...storeFavorite, favoriteRecipes]));
      setFavorite(true);
    }
  }

  function tags() {
    if (progressRecipe[0].strTags) {
      return progressRecipe[0].strTags.split(',');
    }
    return [];
  }

  function ButtonFinish() {
    const date = new Date();
    navigate('/done-recipes');
    localStorage
      .setItem('doneRecipes', JSON.stringify([{
        id: progressRecipe[0].idMeal,
        type: 'meal',
        nationality: progressRecipe[0].strArea || '',
        category: progressRecipe[0].strCategory || '',
        alcoholicOrNot: '',
        name: progressRecipe[0].strMeal,
        image: progressRecipe[0].strMealThumb,
        doneDate: date,
        tags: tags(),
      }]));
  }

  const ingredient = progressRecipe
  && Object.entries(progressRecipe[0])
    .filter((i) => i[0]
      .startsWith('strIngredient')).filter((i) => i[1] !== null && i[1] !== '');

  const measure = progressRecipe
      && Object.entries(progressRecipe[0])
        .filter((i) => i[0]
          .startsWith('strMeasure'));
  // não tira o loading
  if (loading) {
    return (
      <h1>loading</h1>
    );
  }

  const indice = localItems.meals[id].length !== 0;

  return (
    <>
      <button onClick={ ShareRecipes }>
        <img
          src={ shareIcon }
          alt="icone do botão de compartilhar"
          data-testid="share-btn"
        />
        Share

      </button>
      {copiedMsg && (<p className={ copiedMsg }>{ copiedMsg }</p>)}
      <button onClick={ FavoriteRecipe }>
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
          data-testid="favorite-btn"
        />
        Favorite

      </button>
      <h1 data-testid="recipe-title">{progressRecipe[0].strMeal}</h1>
      <img
        src={ progressRecipe[0].strMealThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{progressRecipe[0].strCategory}</p>
      <p data-testid="instructions">{`${progressRecipe[0].strInstructions}`}</p>
      {ingredient.map((meals, index) => (
        <div key={ progressRecipe[0].idMeal }>
          <LabelIngrediente
            index={ index }
            ingredient={ ingredient }
            drinksOuMeals={ meals }
            measure={ measure }
            id={ id }
            type="meals"
          />
        </div>
      ))}
      <button
        onClick={ ButtonFinish }
        disabled={ indice }
        data-testid="finish-recipe-btn"
      >
        finalizar

      </button>
    </>
  );
}
