import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import FoodContext from '../Context/FoodContext';
import { DrinksCategory, DetailsMeal } from '../type';
import { DrinksAll, DrinksCategoryApi } from '../ApiAll';

export default function Drinks() {
  const { stateGlobal, setStateGlobal, setIdDetails } = useContext(FoodContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [category, setCategory] = useState<DrinksCategory>({});
  const [recommendation, setRecommendation] = useState<DetailsMeal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    DrinksCategoryApi().then((data) => setCategory(data));
    fetch(drinksApi)
      .then((response) => response.json())
      .then((data) => {
        setStateGlobal(data.drinks);
      });
  }, [setStateGlobal]); // TODA VEZ QUE TIVER MUDANÇA, ELE ATUALIZAR O CONTEUDO

  function cardNavigate(drink: any) {
    setIdDetails(drink.idDrink);
    navigate(`/drinks/${drink.idDrink}`);
  }

  function handleCategoryClick(categoryName: string) {
    const drinksApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;

    if (selectedCategory !== categoryName) {
      fetch(drinksApi)
        .then((response) => response.json())
        .then((data) => {
          setStateGlobal(data.drinks);
          setSelectedCategory(categoryName);
        });
    } else {
      handleAll();
    }
  }
  async function handleAll() {
    const response = await DrinksAll();
    setSelectedCategory('all');
    setStateGlobal(response.drinks);
    setRecommendation([]); // zera recomendação qdo categoria = All
  }

  const drinksSlice = stateGlobal ? stateGlobal.slice(0, 12) : [];
  return (
    <>
      <Header title="Drinks" searchOk profileOk />
      {' '}
      <div>
        <button data-testid="All-category-filter" onClick={ handleAll }>
          All
        </button>
        {category.drinks && category.drinks.slice(0, 5).map((item) => (
          <button
            type="button"
            key={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(item.strCategory) }
          >
            { item.strCategory }
          </button>

        ))}
      </div>
      {drinksSlice
      && (drinksSlice.map((drink, index) => (
        <button
          onClick={ () => cardNavigate(drink) }
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <h2 data-testid={ `${index}-card-name` }>
            { `${drink.strDrink}` }
          </h2>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
            width={ 150 }
          />
        </button>

      )))}
      {recommendation.map((food, index) => (
        <div key={ index }>
          <p>{food.strMeal}</p>
        </div>
      ))}
      <Footer footerOk />
    </>
  );
}
