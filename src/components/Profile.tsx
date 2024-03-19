import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Profile() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  function handleClickDoneRecipes() {
    navigate('/done-recipes');
  }
  function handleClickFavorite() {
    navigate('/favorite-recipes');
  }
  function handleClickLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <Header title="Profile" searchOk={ false } profileOk />
      <h3 data-testid="profile-email">{`${user}`}</h3>
      <button
        data-testid="profile-done-btn"
        onClick={ handleClickDoneRecipes }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
      <Footer footerOk />
    </>
  );
}
