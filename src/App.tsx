import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import MealsInfo from './components/MealsInfo';
import DrinksInfo from './components/DrinksInfo';
import MealsProgress from './components/MealsProgress';
import DrinksProgress from './components/DrinksProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import Favorites from './components/Favorites';
import FoodContext from './Context/FoodProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <FoodContext>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id" element={ <MealsInfo /> } />
        <Route path="/drinks/:id" element={ <DrinksInfo /> } />
        <Route path="/meals/:id/in-progress" element={ <MealsProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <DrinksProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <Favorites /> } />
      </Routes>
    </FoodContext>
  );
}

export default App;
