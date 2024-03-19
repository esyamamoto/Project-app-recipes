export type LoginType = {
  email: string,
  password: string,
};

export type FoodContextType = {
  search: string[],
  searchResults: any[],
};

export type HeaderProps = {
  title: string,
  searchOk: boolean,
  profileOk: boolean,
};

export type InicialType = {
  inputSearch: string,
  stateGlobal: any[],
  idDetails: string,
  localItems: any,
  setLocalItems:React.Dispatch<any>,
  setIdDetails: React.Dispatch<any>, // React.Dispatch<any> uma função que aceita um argumento
  setStateGlobal: React.Dispatch<any>,
  setInputSearch: React.Dispatch<any>,
};
export type GlobalType = {
  searchText: InicialType,
  searchType: InicialType,
  searchData: any[],
};

export type FooterType = {
  footerOk: boolean,
};

export type MealsCategory = {
  meals: {
    strCategory: string,
  }[]
};

export type DrinksCategory = {
  drinks: {
    strCategory: string,
  }[]
};

export type DetailsMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string,
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strYoutube: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
};

export type DetailsDrink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string
  strArea: string;
  strTags?: string,
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strYoutube?: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
};

export type DoneRecipe = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: any[],

};

export type Favorite = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};
