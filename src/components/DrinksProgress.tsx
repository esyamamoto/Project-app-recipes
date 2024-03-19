import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DrinkDetails } from '../ApiAll';
import { DetailsDrink } from '../type';
import { INITIAL_STATE_DRINKS } from '../utils/inial-state';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import LabelIngrediente from '../utils/ingrediente';
import '../AllCss/Progress.css';
import FoodContext from '../Context/FoodContext';

export default function DrinksProgress() {
  const { setLocalItems, localItems } = useContext(FoodContext);
  const [progressRecipe, setProgressRecipe] = useState<
  DetailsDrink[]>(INITIAL_STATE_DRINKS);
  const [clear, setClear] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [finish, setfinish] = useState(false);
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
        },
        drinks: {
          [id as string]: ingredient.slice(0, ingredient.length).map((e:any) => e[1]),
        },
      }));
    }
    setLocalItems(JSON.parse(localStorage.getItem(('inProgressRecipes')) as string));
  }

  useEffect(() => {
    const fetchApi = async () => {
      if (id) {
        const data = await DrinkDetails(id);
        setProgressRecipe(data.drinks);
        response(data.drinks);
        setLoading(false);
      }
    };
    setLocalItems(JSON.parse(localStorage.getItem(('inProgressRecipes')) as string));
    fetchApi();
    setFavorite(favYorN());
    setLoading(false);
  }, []);

  if (!id) {
    return console.log('não tem id');
  }
  if (!localItems) {
    return console.log('');
  }

  function ShareRecipes() {
    const urlCopied = `${window
      .location.origin}/drinks/${progressRecipe[0].idDrink}`;
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
        id: progressRecipe[0].idDrink,
        type: 'drink',
        nationality: progressRecipe[0].strArea || '',
        category: progressRecipe[0].strCategory || '',
        alcoholicOrNot: progressRecipe[0].strAlcoholic || '',
        name: progressRecipe[0].strDrink,
        image: progressRecipe[0].strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...storeFavorite, favoriteRecipes]));
      setFavorite(true);
    }
  }

  function ButtonFinish() {
    const date = new Date();
    navigate('/done-recipes');
    const getDoneRecipes = JSON.parse(localStorage
      .getItem('doneRecipes') as string) || [];
    const overRecipe = {
      id: progressRecipe[0].idDrink,
      type: 'drink',
      nationality: progressRecipe[0].strArea || '',
      category: progressRecipe[0].strCategory || '',
      alcoholicOrNot: progressRecipe[0].strAlcoholic || '',
      name: progressRecipe[0].strDrink,
      image: progressRecipe[0].strDrinkThumb,
      doneDate: date,
      tags: [],
    };
    const rep = [...getDoneRecipes, overRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(rep));
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

  const indice = localItems.drinks[id].length !== 0;

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
      <h1 data-testid="recipe-title">{progressRecipe[0].strDrink}</h1>
      <img
        src={ progressRecipe[0].strDrinkThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{progressRecipe[0].strAlcoholic}</p>
      <p data-testid="instructions">{`${progressRecipe[0].strInstructions}`}</p>
      {ingredient.map((drinks, index) => (
        <div key={ progressRecipe[0].idDrink }>
          <LabelIngrediente
            index={ index }
            ingredient={ ingredient }
            drinksOuMeals={ drinks }
            measure={ measure }
            id={ id }
            type="drinks"
          />
        </div>
      ))}
      <button
        disabled={ indice }
        onClick={ ButtonFinish }
        data-testid="finish-recipe-btn"
      >
        finalizar

      </button>
    </>
  );
}
