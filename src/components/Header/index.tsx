import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { FirstLetterApi, FirstLetterApiDrinks,
  IngredientesApi, IngredientesApiDrinks, NameApi, NameApiDrinks } from '../../ApiAll';
import { HeaderProps } from '../../type';
import FoodContext from '../../Context/FoodContext';

const INITIAL_STATE = {
  text: '',
  type: '',
};

function Header({ title, searchOk = false, profileOk = false }: HeaderProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(true);
  const [inputSearch, setInputSearch] = useState<typeof INITIAL_STATE>(INITIAL_STATE);
  const { setStateGlobal, setIdDetails } = useContext(FoodContext);

  // redireciona para rota profile
  // const [recipes, setRecipes] = useState([]);

  function handleProfileClick() {
    return (
      navigate('/profile')
    );
  }

  // faz a captura do input de pesquisa

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputSearch({
      ...inputSearch,
      [name]: value,
    });
  };

  // faz a busca na Api das receitas
  const alertError = "Sorry, we haven't found any recipes for these filters.";
  const mealsApi = async () => {
    if (inputSearch.type === 'Ingredient') {
      const data = await IngredientesApi(inputSearch.text);
      const dataObject = await data.meals;
      setStateGlobal(dataObject);
      // console.log(stateGlobal);
      if (!dataObject || dataObject.length === 0) {
        window.alert(alertError);
        return;
      }
      if (dataObject.length === 1) {
        const dataId = await data.meals[0].idMeal;
        setIdDetails(dataId);
        console.log(dataId);
        navigate(`/meals/${dataId}`);
        return dataId;
      }
      return data;
    }
    if (inputSearch.type === 'Name') {
      const data = await NameApi(inputSearch.text);
      const dataObject = data.meals;
      setStateGlobal(dataObject);
      if (!dataObject || dataObject.length === 0) {
        window.alert(alertError);
        return;
      }
      if (dataObject.length === 1) {
        const dataId = await data.meals[0].idMeal;
        console.log(dataId);
        setIdDetails(dataId);
        navigate(`/meals/${dataId}`);
        return dataId;
      }
      return data;
    }
    if (inputSearch.type === 'FirstLetter') {
      if (inputSearch.text.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
      }
      const data = await FirstLetterApi(inputSearch.text);
      return data;
    }
  };

  // faz a busca na Api dos drinks

  const drinksApi = async () => {
    if (inputSearch.type === 'Ingredient') {
      const data = await IngredientesApiDrinks(inputSearch.text);
      const dataObject = data.drinks;
      setStateGlobal(dataObject);
      // console.log(stateGlobal);
      if (dataObject === null || !dataObject.length) {
        window.alert(alertError);
        return;
      }
      if (dataObject.length === 1) {
        const dataId = await data.drinks[0].idDrink;
        setIdDetails(dataId);
        console.log(dataId);
        navigate(`/drinks/${dataId}`);
        return dataId;
      }
      return data;
    }
    if (inputSearch.type === 'Name') {
      const data = await NameApiDrinks(inputSearch.text);
      const dataObject = data.drinks;
      setStateGlobal(dataObject);
      if (dataObject === null || !dataObject.length) {
        window.alert(alertError);
        return;
      }
      if (dataObject.length === 1) {
        const dataId = await data.drinks[0].idDrink;
        setIdDetails(dataId);
        console.log(dataId);
        navigate(`/drinks/${dataId}`);
        return dataId;
      }
      return data;
    }
    if (inputSearch.type === 'FirstLetter') {
      if (inputSearch.text.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
      }
      const data = await FirstLetterApiDrinks(inputSearch.text);
      return data;
    }
  };

  // dispara determinada função de acordo com a pagina

  const fetchAPI = async () => {
    if (window.location.pathname === '/meals') {
      mealsApi();
    }
    if (window.location.pathname === '/drinks') {
      drinksApi();
    }
  };

  // outras funções que fazem aparecer e desaparecer elementos na tela

  function handleSearchClick() {
    if (search === true) {
      setSearch(false);
      return search;
    }
    return setSearch(true);
  }

  function buttonProfile() {
    return (
      <button onClick={ handleProfileClick }>
        <img src={ profileIcon } alt="pesquisar" data-testid="profile-top-btn" />
      </button>
    );
  }

  function buttonSearch() {
    return (
      <button onClick={ handleSearchClick }>
        <img
          src={ searchIcon }
          alt="pesquisar"
          data-testid="search-top-btn"
        />
      </button>
    );
  }

  return (
    <>
      <p data-testid="page-title">{ title }</p>
      {profileOk && buttonProfile() }
      {searchOk && buttonSearch() }
      {!search && <input
        name="text"
        data-testid="search-input"
        onChange={ handleChange }
        type="text"
        value={ inputSearch.text }
      />}
      {!search && <SearchBar
        inputSearch={ inputSearch }
        handleChange={ handleChange }
        fetchAPI={ fetchAPI }
      />}
    </>
  );
}
export default Header;
