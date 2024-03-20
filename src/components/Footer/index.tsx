import { useNavigate } from 'react-router-dom';
import drinkIcone from '../../images/drinkIcone.png';
import mealIcone from '../../images/mealIcon.png';
import { FooterType } from '../../type';
import '../../AllCss/Footer.css';

export default function Footer({ footerOk = false }: FooterType) {
  const navigate = useNavigate();

  function handleMealClick() {
    return (
      navigate('/meals')
    );
  }

  function handleDrinkClick() {
    return (
      navigate('/drinks')
    );
  }

  function buttonDrinks() {
    return (
      <button
        onClick={ handleDrinkClick }
        className="button iconButton"
      >
        <img
          className="iconFooter"
          src={ drinkIcone }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
        />
      </button>
    );
  }

  function buttonMeals() {
    return (
      <button
        className="button iconButton"
        onClick={ handleMealClick }
      >
        <img
          className="iconFooter"
          src={ mealIcone }
          alt="Meals"
          data-testid="meals-bottom-btn"
        />
      </button>
    );
  }
  return (
    <footer className="footer" data-testid="footer">
      {footerOk && buttonDrinks()}
      {footerOk && buttonMeals()}
    </footer>
  );
}
