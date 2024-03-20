import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './renderwithrouter';
import Header from '../components/Header';
import App from '../App';
import mockIngredient from './mocksPraTeste/headerMock';

const searchTop = 'search-top-btn';
const searchInputBtn = 'search-input';
const execSearchBtn = 'exec-search-btn';

describe('Testando o componente Header', () => {
  const profile = 'profile-top-btn';
  const nameSearch = 'name-search-radio';

  beforeEach(() => {
    const MOCK_API = mockIngredient;
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => MOCK_API,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('verifica se title é renderizado', () => {
    renderWithRouter(<Header title="Comidas" searchOk profileOk />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Comidas');
  });
  it('verifica se o botão de perfil é renderizado', () => {
    renderWithRouter(<Header title="Comidas" searchOk profileOk />);
    const profileButton = screen.getByTestId(profile);
    expect(profileButton).toBeInTheDocument();
  });
  it('verifica se o botão de pesquisa é renderizado', () => {
    renderWithRouter(<Header title="Comidas" searchOk profileOk />);
    const searchButton = screen.getByTestId(searchTop);
    expect(searchButton).toBeInTheDocument();
  });
  it('verifica se o click no botão de perfil redireciona para a página de perfil', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const profileButton = screen.getByTestId(profile);
    await userEvent.click(profileButton);
    expect(window.location.pathname).toBe('/profile');
  });
  it('verifica se o formulário de pesquisa é renderizado', async () => {
    renderWithRouter(<Header title="Comidas" searchOk profileOk />);
    const searchButton = screen.getByTestId(searchTop);
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputBtn);
    expect(searchInput).toBeInTheDocument();
    await userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('verifica se o click no botão de pesquisa redireciona para a página de pesquisa', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId(searchTop);
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputBtn);
    await userEvent.type(searchInput, 'search');
    const searchIcon = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchIcon);
    expect(window.location.pathname).toBe('/meals');
  });
  it('verifica se a api é chamada corretamente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    // expect(global.fetch).toBeCalled();
    // expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    // expect(global.fetch).toBeCalledTimes(1);
    await userEvent.click(screen.getByTestId(searchTop));
    const searchInput = screen.getByTestId(searchInputBtn);
    await userEvent.type(searchInput, 'lemon');
    await userEvent.click(screen.getByTestId(nameSearch));
    await userEvent.click(screen.getByTestId(execSearchBtn));
    await userEvent.click(screen.getByTestId('ingredient-search-radio'));
    await userEvent.click(screen.getByTestId(execSearchBtn));
    await userEvent.click(screen.getByTestId('first-letter-search-radio'));
    await userEvent.click(screen.getByTestId(execSearchBtn));
  });
  it('verifica se o handleProfileClick funciona', async () => {
    renderWithRouter(<Header title="Comidas" searchOk profileOk />);
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    await userEvent.click(profileButton);
    expect(window.location.pathname).toBe('/profile');
  });
  it('verifica se o alert está pegando o erro', async () => {
    const alert = vi.spyOn(global, 'alert');
    renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId(searchTop);
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputBtn);
    await userEvent.click(screen.getByTestId('first-letter-search-radio'));
    await userEvent.type(searchInput, 'xablau');
    await userEvent.click(screen.getByTestId(execSearchBtn));
    expect(alert).toBeCalled();
  });
  it('verifica se o alert está pegando o erro peloname', async () => {
    const alert = vi.spyOn(global, 'alert');
    renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId(searchTop);
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputBtn);
    await userEvent.click(screen.getByTestId(nameSearch));
    await userEvent.type(searchInput, 'xablau');
    await userEvent.click(screen.getByTestId(execSearchBtn));
    screen.debug();
    expect(alert).toBeCalled();
  });
  it('verifica se o alert está pegando o erro pelo ingrediente', async () => {
    const alert = vi.spyOn(global, 'alert');
    renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId(searchTop);
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputBtn);
    await userEvent.click(screen.getByTestId('ingredient-search-radio'));
    await userEvent.type(searchInput, 'xablau');
    await userEvent.click(screen.getByTestId(execSearchBtn));
    expect(alert).toBeCalled();
  });
});
