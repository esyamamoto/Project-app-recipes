function SearchBar({ fetchAPI, handleChange, inputSearch }: any) {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="type"
          value="Ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          checked={ inputSearch.type === 'Ingredient' }
        />
        Ingredient
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Name"
          name="type"
          onChange={ handleChange }
          checked={ inputSearch.type === 'Name' }
        />
        Name
      </label>
      <label>
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="FirstLetter"
          name="type"
          onChange={ handleChange }
          checked={ inputSearch.type === 'FirstLetter' }
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ fetchAPI }
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar;
