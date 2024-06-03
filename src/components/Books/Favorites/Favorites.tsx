import { useDispatch, useSelector } from 'react-redux';

import BookImageContainer from '../BookImageContainer/BookImageContainer';
import { IStoreState, IBook } from '../../../types';
import { removeBookFromFavorites } from '../../../redux/actionCreators/userActionCreator';
import { HeartIcon } from '../../Icons/HeartIcon';
import BookSlider from '../BookSlider/BookSlider';

const Favorites = () => {
  const favorites = useSelector((state: IStoreState) => state.user.favorites);
  const books = useSelector((state: IStoreState) => state.books.books);

  const dispatch = useDispatch();

  const handleRemoveBook = (book: IBook) => dispatch(removeBookFromFavorites(book));

  const priceToNumber = (book: IBook) =>
    +parseFloat(book.price.replace('$', '')).toFixed(2);

  const popularBooks = books.sort((a, b) => priceToNumber(a) - priceToNumber(b));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {favorites.length ? (
        <h1 className="title">Favorites</h1>
      ) : (
        <h1 className="title">You haven't favorites books</h1>
      )}
      {favorites.length > 0 && (
        <div className="favorites-items">
          {favorites.map((item, index) => (
            <div className="favorites-item" key={index}>
              <div className="favorites-item-info">
                <BookImageContainer image={item.image} />
                <div className="item-info">
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-text">
                    {item.authors}, Apress{item.year}
                  </p>
                </div>
              </div>
              <HeartIcon isFilled={true} onClick={() => handleRemoveBook(item)} />
            </div>
          ))}
        </div>
      )}
      <BookSlider title="Popular books" books={popularBooks} />
    </div>
  );
};

export default Favorites;
