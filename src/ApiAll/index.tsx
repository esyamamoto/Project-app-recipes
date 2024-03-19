// api Meals
export async function IngredientesApi(ingrediente: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
}

export async function NameApi(nome: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data;
}

export async function FirstLetterApi(primeiraletra: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
  const data = await response.json();
  return data;
}

// api drinks

export async function IngredientesApiDrinks(ingrediente: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
}

export async function NameApiDrinks(nome: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data;
}

export async function FirstLetterApiDrinks(primeiraletra: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
  const data = await response.json();
  return data;
}

export async function MealsCategoryApi() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
}

export async function DrinksCategoryApi() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
}

export async function MealsAll() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
}

export async function DrinksAll() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function MealDetails(idMeals: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`);
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function DrinkDetails(idDrink: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
  const data = await response.json();
  // console.log(data);
  return data;
}
