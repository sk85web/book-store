import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ButtonType, IStoreState, LSTokens } from '../../../types';
import { loadSelectedBook } from '../../../redux/actionCreators/bookActionCreator';
import BookImageContainer from '../BookImageContainer/BookImageContainer';
import { HeartIcon } from '../../Icons/HeartIcon';
import Button from '../../Button/Button';
import { ArrowListIcon } from '../../Icons/ArrowListIcon';
import StarRating from '../../StarRating/StarRating';
import BookTabs from '../BookTabs/BookTabs';
import BookSocial from '../BookSocial/BookSocial';
import BookSlider from '../BookSlider/BookSlider';
import {
  addBookToCart,
  addBookToFavorites,
  removeBookFromFavorites,
} from '../../../redux/actionCreators/userActionCreator';
import { ROUTES } from '../../../utils/routes';

const BookInfo = () => {
  const { isbn13 = '' } = useParams();
  const accessToken = localStorage.getItem(LSTokens.ACCESS_TOKEN);

  const books = useSelector((state: IStoreState) => state.books.books);
  const selectedBook = useSelector((state: IStoreState) => state.books.selectedBook);
  const favoriteBooks = useSelector((state: IStoreState) => state.user.favorites);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSelectedBook(isbn13));
  }, [isbn13]);

  const [detailInfo, setDetailInfo] = useState(false);

  const isShowInfo = () => {
    setDetailInfo(!detailInfo);
  };

  const addToCart = () => {
    if (accessToken) {
      dispatch(addBookToCart(selectedBook));
      alert('Book was added to cart');
    } else {
      navigate(ROUTES.AUTHORISATION);
    }
  };

  const isInFavorites = !!favoriteBooks.find(book => book.isbn13 === selectedBook.isbn13);

  const addToFavorites = () => {
    if (accessToken) {
      if (!isInFavorites || favoriteBooks.length === 0) {
        dispatch(addBookToFavorites(selectedBook));
        alert('Book was added to favorites');
      } else {
        dispatch(removeBookFromFavorites(selectedBook));
        alert('Book was removed from favorites');
      }
    } else {
      navigate(ROUTES.AUTHORISATION);
    }
  };

  const filteredBooks = books.filter(book => book.isbn13 !== selectedBook.isbn13);

  return (
    <div className="book-info-block">
      <h1 className="book-info-title">{selectedBook.title}</h1>
      <div className="book-main-info">
        <div className="book-image">
          <BookImageContainer image={selectedBook.image} />
          <div className="icon-block">
            <HeartIcon onClick={addToFavorites} isFilled={isInFavorites} />
          </div>
        </div>
        <div className="book-info">
          <div className="book-info-header">
            <div className="book-info-title">
              <span className="book-info-item-price">{selectedBook.price}</span>
              <StarRating rating={selectedBook.rating} />
            </div>
            <div className="book-info-content">
              <div className="book-info-content-item">
                <span className="book-info-item book-info-item-key">Authors</span>
                <span className="book-info-item book-info-item-value">
                  {selectedBook.authors}
                </span>
              </div>
              <div className="book-info-content-item">
                <span className="book-info-item book-info-item-key">Publisher</span>
                <span className="book-info-item book-info-item-value">
                  {selectedBook.publisher}
                </span>
              </div>
              <div className="book-info-content-item">
                <span className="book-info-item book-info-item-key">Language</span>
                <span className="book-info-item book-info-item-value">
                  {selectedBook.language}
                </span>
              </div>
              <div className="book-info-content-item">
                <span className="book-info-item book-info-item-key">Format</span>
                <span className="book-info-item book-info-item-value">
                  Paper book / ebook (PDF)
                </span>
              </div>

              <div className="more-info-header" onClick={isShowInfo}>
                <h3 className="detail-block-title">More info</h3>
                <ArrowListIcon className={detailInfo ? 'up' : 'down'} />
              </div>

              {detailInfo && (
                <div className="book-info-content">
                  <div className="book-info-content-item">
                    <span className="book-info-item book-info-item-key">Pages</span>
                    <span className="book-info-item book-info-item-value">
                      {selectedBook.pages}
                    </span>
                  </div>
                  <div className="book-info-content-item">
                    <span className="book-info-item book-info-item-key">
                      The year of publishing
                    </span>
                    <span className="book-info-item book-info-item-value">
                      {selectedBook.year}
                    </span>
                  </div>
                  <div className="book-info-content-item">
                    <span className="book-info-item book-info-item-key">Rating</span>
                    <span className="book-info-item book-info-item-value">
                      {selectedBook.rating} / 5
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="book-info-foter">
            <Button text="add to cart" type={ButtonType.BUTTON} onClick={addToCart} />
            <a href={selectedBook.url}>Preview book</a>
          </div>
        </div>
      </div>
      <BookTabs selectedBook={selectedBook} />
      <BookSocial />
      <BookSlider books={filteredBooks} title="Similar books" />
    </div>
  );
};

export default BookInfo;
