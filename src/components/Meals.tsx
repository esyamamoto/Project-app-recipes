import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import FoodContext from '../Context/FoodContext';
import { MealsAll, MealsCategoryApi } from '../ApiAll';
import { MealsCategory, DetailsDrink } from '../type';

export default function Meals() {
  const { stateGlobal, setStateGlobal, setIdDetails } = useContext(FoodContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [category, setCategory] = useState<MealsCategory>({}); // estado local para armazenar as categorias de comidas
  const [recommendation, setRecommendation] = useState<DetailsDrink[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mealsApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    MealsCategoryApi().then((data) => setCategory(data));
    fetch(mealsApi)
      .then((response) => response.json())
      .then((data) => {
        setStateGlobal(data.meals);
      });
  }, [setStateGlobal]); // vazio [] como segundo argumento para useEffect é o que garante que ele seja executado apenas na montagem do componente.

  function cardNavigate(meal:any) {
    setIdDetails(meal.idMeal);
    navigate(`/meals/${meal.idMeal}`);
  }

  // retorna  as categorias clicadas
  async function handleCategoryClick(categoryName: string) {
    const mealsApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

    if (selectedCategory !== categoryName) {
      fetch(mealsApi)
        .then((response) => response.json())
        .then((data) => {
          setStateGlobal(data.meals);
          setSelectedCategory(categoryName);
        });
    } else {
      handleAll();
    }
  }
  async function handleAll() {
    const response = await MealsAll();
    setSelectedCategory('all');
    setStateGlobal(response.meals);
    setRecommendation([]); // zera recomendação qdo categoria = All
  }

  const mealsSlice = stateGlobal ? stateGlobal.slice(0, 12) : [];
  return (
    <>
      <Header title="Meals" searchOk profileOk />
      {' '}
      <div>
        <button data-testid="All-category-filter" onClick={ handleAll }>
          All
        </button>
        {category.meals && category.meals.slice(0, 5).map((item) => (
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
      {mealsSlice
      && (mealsSlice.map((meal, index) => (
        <button
          onClick={ () => cardNavigate(meal) }
          key={ meal.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <h2 data-testid={ `${index}-card-name` }>
            { `${meal.strMeal}` }
          </h2>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
            width={ 150 }
          />
        </button>
      )))}
      {recommendation.map((food, index) => (
        <div key={ index }>
          <p>{food.strDrink}</p>
        </div>
      ))}
      <Footer footerOk />
    </>
  );
}
