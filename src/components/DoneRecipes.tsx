import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import { DoneRecipe } from '../type';

export default function DoneRecipes() {
  const [filter, setFilter] = useState<string>('all');
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [clear, setClear] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('');
  const navigate = useNavigate();

  const recipes = localStorage.getItem('doneRecipes');
  useEffect(() => {
    if (recipes) {
      const DoneRecipesStore = JSON.parse(recipes);
      setDoneRecipes(DoneRecipesStore);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  function ShareRecipes() {
    const urlCopied = `${window
      .location.origin}/${doneRecipes[0].type}s/${doneRecipes[0].id}`;
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
      const recipe = JSON.parse(recipes as string);
      const meals = recipe
        .filter((meal:any) => meal.type === 'meal');
      setFilter('meal');
      setDoneRecipes(meals);
    }
  }

  function handleClickDrinksCategory() {
    if (filter !== 'drink') {
      const recipe = JSON.parse(recipes as string);
      const drinks = recipe
        .filter((drink:any) => drink.type === 'drink');
      setFilter('drink');
      setDoneRecipes(drinks);
    }
  }

  function handleClickAllCategory() {
    if (filter !== 'all') {
      setFilter('all');
      setDoneRecipes(JSON.parse(recipes as string));
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
      <Header title="Done Recipes" searchOk={ false } profileOk />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ handleClickAllCategory }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ handleClickMealsCategory }
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDrinksCategory }
        >
          Drinks

        </button>
      </div>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <button
            onClick={ ShareRecipes }
            type="button"

          >
            <img
              src={ shareIcon }
              alt="icone do botão de compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {copiedMsg && (
            <p className={ copiedMsg }>{ copiedMsg }</p>)}
          {' '}
          <button onClick={ () => DetailPage(recipe.id, recipe.type) }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h3>
            <img
              src={ recipe.image }
              alt="Foto da receita"
              width={ 250 }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((tag, cont) => (
            <p
              key={ cont }
              data-testid={
            `0-${tag}-horizontal-tag`
}
            >
              {tag}
            </p>))}
        </div>
      ))}
    </>
  );
}
