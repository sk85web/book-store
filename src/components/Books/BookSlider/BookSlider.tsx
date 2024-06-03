import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { IStoreState } from '../../../types';
import { loadBooks } from '../../../redux/actionCreators/bookActionCreator';
import Book from '../Book/Book';
import './BookSlider.css';
import { ArrowSliderIcon } from '../../Icons/ArrowSliderIcon';
import { IBook } from '../../../types';

interface BookSliderProps {
  title: string;
  books: IBook[];
}

const BookSlider: React.FC<BookSliderProps> = ({ books, title }) => {
  const total = useSelector((state: IStoreState) => state.books.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooks({ books, total }));
  }, [dispatch]);

  const [position, setPosition] = useState(0);
  const moveLeft = () => {
    setPosition(prevPosition => Math.min(prevPosition + 384, 0));
  };

  const moveRight = () => {
    setPosition(prevPosition =>
      Math.max(prevPosition - 384, -((books.length - 1) * 384)),
    );
  };

  return (
    <div className="slider">
      <div className="slider-header">
        <h1 className="title">{title}</h1>
        <div className="arrow-block">
          <ArrowSliderIcon onClick={moveLeft} className="left" />
          <ArrowSliderIcon onClick={moveRight} className="right" />
        </div>
      </div>

      <div className="slider-body">
        <div className="slider-wrapper">
          <ul className="slider-line" style={{ transform: `translateX(${position}px)` }}>
            {books.map(book => (
              <li key={book.isbn13} className="slider-item">
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
      </div>
    </div>
  );
};

export default BookSlider;
