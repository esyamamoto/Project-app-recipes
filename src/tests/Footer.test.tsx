import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../components/Meals';
import renderWithRouter from './renderwithrouter';

test('O componente Footer renderiza corretamente', () => {
  renderWithRouter(<Meals />);

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();

  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(mealsIcon).toBeInTheDocument();
});

test('verifica se o click no botão de drinks e meals redireciona para a página desejada', async () => {
  renderWithRouter(<Meals />);
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  await userEvent.click(drinksIcon);
  expect(window.location.pathname).toBe('/drinks');
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  await userEvent.click(mealsIcon);
  expect(window.location.pathname).toBe('/meals');
});
