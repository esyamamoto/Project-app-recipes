import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderwithrouter';
import Profile from '../components/Profile';

describe('testando componente profile', () => {
  test('verifica se os button estão na tela e se direcionam pra pagina desejada', () => {
    renderWithRouter(<Profile />);
    const buttonProfileDone = screen.getByTestId('profile-done-btn');
    const buttonProfilefavorite = screen.getByTestId('profile-favorite-btn');
    const buttonProfileLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonProfileDone).toBeInTheDocument();
    expect(buttonProfilefavorite).toBeInTheDocument();
    expect(buttonProfileLogout).toBeInTheDocument();
  });

  test('verifica se o click no botão de Done Recipes redireciona para a página de Done Recipes', async () => {
    renderWithRouter(<Profile />);
    const buttonProfileDone = screen.getByTestId('profile-done-btn');
    expect(buttonProfileDone).toBeInTheDocument();
    await userEvent.click(buttonProfileDone);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('verifica se o click no botão de Favorite Recipes redireciona para a página de Favorite Recipes', async () => {
    renderWithRouter(<Profile />);
    const buttonProfilefavorite = screen.getByTestId('profile-favorite-btn');
    expect(buttonProfilefavorite).toBeInTheDocument();
    await userEvent.click(buttonProfilefavorite);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('verifica se o click no botão de Logout redireciona para a página de login', async () => {
    renderWithRouter(<Profile />);
    const buttonProfileLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonProfileLogout).toBeInTheDocument();
    await userEvent.click(buttonProfileLogout);
    expect(window.location.pathname).toBe('/');
  });
});
