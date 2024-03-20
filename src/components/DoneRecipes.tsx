import { useState } from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [filter, setFilter] = useState([]);
  const recipes = localStorage.getItem('doneRecipes');

  function handleClickMeals() {
    return 'nada';
  }

  function handleClickDrinks() {
    return 'nada';
  }

  function handleClickAll() {
    return (
      handleClickMeals()
      && handleClickDrinks()
    );
  }
  return (
    <>
      <Header title="Done Recipes" searchOk={ false } profileOk />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ handleClickAll }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ handleClickMeals }
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDrinks }
        >
          Drinks

        </button>
      </div>
      {/* {<img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      <h3 data-testid={ `${index}-horizontal-name` }>nome</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>categoria</p>
      <p data-testid={`${index}-horizontal-top-text`}>{`${nationality} - ${category}`}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>data</p>
      <button data-testid={ `${index}-horizontal-share-btn` }>
        <img src={shareIcon} alt="" />
      </button>
      <p data-testid={ `${index}-${tagName}-horizontal-tag` }>tags</p>} */}
    </>
  );
}

// 45 – Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela apresente: foto da receita, nome, categoria, nacionalidade, data em que a pessoa fez a
// receita, duas primeiras tags retornadas pela API e botão de compartilhar
