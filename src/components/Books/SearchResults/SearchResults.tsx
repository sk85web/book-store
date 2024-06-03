import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSearchBooks } from '../../../redux/actionCreators/bookActionCreator';
import { Link, useParams } from 'react-router-dom';

import { IStoreState } from '../../../types';
import Book from '../Book/Book';
import Pagination from '../../Pagination/Pagination';

const SearchResults = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: IStoreState) => state.books.searchBooks);
  const total = useSelector((state: IStoreState) => state.books.searchTotal);
  const currentPage = useSelector((state: IStoreState) => state.books.currentPage);
  const { query } = useParams();

  useEffect(() => {
    dispatch(loadSearchBooks({ books, total, search: query, page: currentPage }));
  }, [dispatch, query, currentPage]);

  return (
    <div>
      <h1 className="title">
        '{query}' search results
        <p className="search-subtitle">Found {books.length} books</p>
      </h1>
      {books.length ? (
        <>
          <ul className="container">
            {books.map(book => (
              <li key={book.isbn13} className="book-item">
                <Link to={`/books/${book.isbn13}`} style={{ textDecoration: 'none' }}>
                  <Book
                    image={book.image}
                    title={book.title}
                    price={book.price}
                    isbn13={book.isbn13}
                    rating={book.rating}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Pagination />
        </>
      ) : (
        <h2 className="no-results-title">We're sorry, nothing found</h2>
      )}
    </div>
  );
};

export default SearchResults;
