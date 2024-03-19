import { useContext, useEffect, useState } from 'react';
import FoodContext from '../Context/FoodContext';

export default function LabelIngrediente(prop: any) {
  const [check, setCheck] = useState(false);
  const [click, setClick] = useState<string[]>([]);
  const { index, drinksOuMeals, measure, id, type, ingredient } = prop;
  const { localItems, setLocalItems } = useContext(FoodContext);

  const recipe = ingredient.map((i:any) => i[1]);
  console.log(recipe);

  function diference(localStorage: any) {
    const itens = recipe.filter((i: any) => !localStorage[type][id].includes(i));
    return itens;
  }

  useEffect(() => {
    const localStore = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
    if (localStore) {
      const retornItem = diference(localStore);
      if (retornItem.includes(drinksOuMeals[1])) {
        setCheck(true);
      }
    }
  }, []);

  function handleChange() {
    if (!check) {
      const newIngredient = localItems[type][id]
        .filter((i:any) => i !== drinksOuMeals[1]);

      setLocalItems({
        ...localItems, [type]: { ...localItems[type], [id]: newIngredient } });

      localStorage.setItem('inProgressRecipes', JSON
        .stringify(
          { ...localItems, [type]: { ...localItems[type], [id]: newIngredient } },
        ));

      return setCheck(true);
    }
    const newIngredient = localItems[type][id];
    newIngredient.push(drinksOuMeals[1]);
    setLocalItems({
      ...localItems, [type]: { ...localItems[type], [id]: newIngredient } });

    localStorage.setItem('inProgressRecipes', JSON
      .stringify(
        { ...localItems, [type]: { ...localItems[type], [id]: newIngredient } },
      ));

    setCheck(false);
  }

  return (
    <label
      className={ check ? 'economica' : 'executiva' }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        onChange={ handleChange }
        type="checkbox"
        checked={ check }
      />
      { `${drinksOuMeals[1]} - ${measure[index][1]}` }
    </label>
  );
}

// check false: => check true - vai pegar o array  itemOrigin e vai salvar no localStorege
// check true: => check false - vai pegar o valor clicado vai adicionar no array ingredient para adiconar no localStorege novamente
