import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { Favorite } from '../type';

export default function Favorites() {
  const [filter, setFilter] = useState<string>('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [clear, setClear] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('');
  const navigate = useNavigate();

  const favorite = localStorage.getItem('favoriteRecipes');

  useEffect(() => {
    if (favorite) {
      const FavoriteRecipesStore = JSON.parse(favorite);
      setFavoriteRecipes(FavoriteRecipesStore);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  // ve se ta ta favoritada a receita
  function favYorN(id:string) {
    // verifica se ja tem a receita add como fav no localStorage
    const storeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return storeFavorite.some((recipe: any) => recipe.id === id);
  }

  function FavoriteRecipe(id:string) {
    const storeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favYorN(id)) {
      const setFavNew = storeFavorite.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(setFavNew));
    }
    window.location.reload();
  }

  function ShareRecipes(type:string, id:string) {
    const urlCopied = `${window
      .location.origin}/${type}s/${id}`;
    console.log(urlCopied);
    navigator.clipboard.writeText(urlCopied);
    setClear(true);
    setCopiedMsg('Link copied!');
    setTimeout(() => {
      setCopiedMsg('');
      setClear(false);
    }, 3000);
  }
  function DetailPage(id:string, type:string) {
    navigate(`/${type}s/${id}`);
  }

  function handleClickMealsCategory() {
    if (filter !== 'meal') {
      const recipe = JSON.parse(favorite as string);
      const meals = recipe
        .filter((meal:any) => meal.type === 'meal');
      setFilter('meal');
      setFavoriteRecipes(meals);
    }
  }

  function handleClickDrinksCategory() {
    if (filter !== 'drink') {
      const recipe = JSON.parse(favorite as string);
      const drinks = recipe
        .filter((drink:any) => drink.type === 'drink');
      setFilter('drink');
      setFavoriteRecipes(drinks);
    }
  }

  function handleClickAllCategory() {
    if (filter !== 'all') {
      setFilter('all');
      setFavoriteRecipes(JSON.parse(favorite as string));
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
      <Header title="Favorite Recipes" searchOk={ false } profileOk />
      <h1>Favorites</h1>
      <div>
        <button
          onClick={ handleClickAllCategory }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          onClick={ handleClickMealsCategory }
          data-testid="filter-by-meal-btn"
        >
          Meals

        </button>
        <button
          onClick={ handleClickDrinksCategory }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>

        {favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <button onClick={ () => DetailPage(recipe.id, recipe.type) }>
              <h2 data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </h2>
              <img
                width={ 450 }
                src={ recipe.image }
                alt={ `${recipe.name} Recipe` }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${favoriteRecipes[index]
                .nationality} - ${favoriteRecipes[index].category}`}
              {' '}
              {recipe.alcoholicOrNot }
            </p>
            <button onClick={ () => FavoriteRecipe(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="coração negro"
              />
            </button>
            <button
              onClick={ () => ShareRecipes(recipe.type, recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
            </button>
            {copiedMsg && (
              <p className={ copiedMsg }>{ copiedMsg }</p>)}
          </div>
        ))}
      </div>
    </>
  );
}
