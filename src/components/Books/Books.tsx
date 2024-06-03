import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { loadBooks } from '../../redux/actionCreators/bookActionCreator';
import './Books.css';
import { IStoreState } from '../../types';
import Book from './Book/Book';

const Books = () => {
  const books = useSelector((state: IStoreState) =>  state.books.books);
  const total = useSelector((state: IStoreState) => state.books.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooks({ books, total }));
  }, [dispatch]);

  // const list = books.filter((_, i) => i < 12);
  return (
    <div>
      <h1 className="title">New Releases Books</h1>
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
    </div>
  );
};

export default Books;
