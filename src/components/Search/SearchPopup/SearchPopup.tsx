import { Link } from 'react-router-dom';

import BookImageContainer from '../../Books/BookImageContainer/BookImageContainer';
import { IBook } from '../../../types';

interface ISearchPopupProps {
  searchBooks: IBook[];
  onClick: () => void;
}
const SearchPopup: React.FC<ISearchPopupProps> = ({ searchBooks, onClick }) => {
  return (
    <ul className="search-results">
      {searchBooks.map(book => (
        <li key={book.isbn13} className="search-results-item" onClick={onClick}>
          <Link to={`/books/${book.isbn13}`} className="li-style">
            <BookImageContainer image={book.image} width="90px" />
            <h1 className="search-results-item-title">{book.title}</h1>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchPopup;
