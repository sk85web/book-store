import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import './Search.css';
import { SearchIcon } from '../Icons/SearchIcon';
import { ROUTES } from '../../utils/routes';
import { IStoreState } from '../../types';
import { loadSearchBooks } from '../../redux/actionCreators/bookActionCreator';
import SearchPopup from './SearchPopup/SearchPopup';
import { setCurrentPage } from '../../redux/actionCreators/bookActionCreator';

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const clearInput = () => {
    setValue('');
    setIsOpen(false);
  };

  const goToSearchResults = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`${ROUTES.SEARCH}/${value}`);
      setValue('');
      setIsOpen(false);
      dispatch(setCurrentPage('1'));
    }
  };

  const searchBooks = useSelector((state: IStoreState) => state.books.searchBooks || []);
  const searchTotal = useSelector((state: IStoreState) => state.books.searchTotal);
  useEffect(() => {
    if (value) {
      dispatch(
        loadSearchBooks({ books: searchBooks, total: searchTotal, search: value }),
      );
    }
  }, [dispatch, value]);

  return (
    <div className="search-list">
      <div className="search-container">
        <input
          className={'search'}
          placeholder={'Search...'}
          name="search"
          autoComplete="off"
          value={value}
          onChange={handleChange}
          onKeyDown={e => goToSearchResults(e)}
        />
        {!value && <SearchIcon />}
        {value && (
          <button className="clear-button" onClick={clearInput}>
            &times;
          </button>
        )}
      </div>
      {isOpen && searchBooks.length > 0 && (
        <SearchPopup searchBooks={searchBooks} onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Search;
