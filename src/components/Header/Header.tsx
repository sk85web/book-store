import { Link } from 'react-router-dom';

import './Header.css';
import Search from '../Search/Search';
import SearchIconsBlock from '../SearchIconsBlock/SearchIconsBlock';

const Header = () => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>bookstore</h1>
      </Link>
      <Search />
      <SearchIconsBlock />
    </header>
  );
};

export default Header;
