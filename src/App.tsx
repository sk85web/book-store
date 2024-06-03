import { Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import BookInfoPage from './pages/BookInfoPage/BookInfoPage';
import AuthorisationPage from './pages/AuthorisationPage/AuthorisationPage';
import { SignConfirmation } from './components/SignConfirmation';
import CartPage from './pages/CartPage/CartPage';
import { ROUTES } from './utils/routes';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import AccountPage from './pages/AccountPage/AccountPage';
import { LSTokens } from './types';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  const accessToken = localStorage.getItem(LSTokens.ACCESS_TOKEN);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.ACTIVATION} element={<SignConfirmation />} />
        <Route path={ROUTES.AUTHORISATION} element={<AuthorisationPage />} />
        <Route path={ROUTES.BOOK_INFO_PAGE} element={<BookInfoPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={`${ROUTES.SEARCH}/:query`} element={<SearchPage />} />
        <Route
          path={ROUTES.ACCOUNT}
          element={accessToken ? <AccountPage /> : <AuthorisationPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
