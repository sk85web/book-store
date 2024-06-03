import { useDispatch, useSelector } from 'react-redux';
import { ButtonType, IBook, IBookCart, IStoreState } from '../../../types';

import BookImageContainer from '../BookImageContainer/BookImageContainer';
import {
  removeBookFromCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../../redux/actionCreators/userActionCreator';
import Checkout from '../Checkout/Checkout';

const Cart = () => {
  const cart = useSelector((state: IStoreState) => state.user.cart);
  const priceToNumber = (item: IBookCart) => {
    return +parseFloat(item.book.price.replace('$', '')).toFixed(2);
  };

  const totalMoneyForBook = (item: IBookCart) => {
    const price = priceToNumber(item);
    return (price * item.quantity).toFixed(2);
  };

  const dispatch = useDispatch();

  const minusOneBook = (book: IBook) => {
    dispatch(decreaseQuantity(book));
  };

  const plusOneBook = (book: IBook) => {
    dispatch(increaseQuantity(book));
  };

  const handleRemoveBook = (book: IBook) => {
    dispatch(removeBookFromCart(book));
  };

  const totalCheck = () => {
    return cart.reduce((acc, cur) => {
      const price = priceToNumber(cur);
      return acc + cur.quantity * price;
    }, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {cart.length ? (
        <h1 className="title">Your Cart</h1>
      ) : (
        <h1 className="title">Your Cart is Empty</h1>
      )}
      {cart.length > 0 && (
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.book.isbn13}>
              <div className="cart-item-info">
                <BookImageContainer image={item.book.image} />
                <div className="item-info">
                  <h2 className="item-title">{item.book.title}</h2>
                  <p className="item-text">
                    {item.book.authors}, Apress{item.book.year}
                  </p>
                  <div className="item-counter">
                    <button
                      type={ButtonType.BUTTON}
                      onClick={() => minusOneBook(item.book)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type={ButtonType.BUTTON}
                      onClick={() => plusOneBook(item.book)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="item-price">${totalMoneyForBook(item)}</div>
              <button
                type={ButtonType.BUTTON}
                className="cart-item-btn"
                onClick={() => handleRemoveBook(item.book)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length ? <Checkout sum={totalCheck()} /> : ''}
    </div>
  );
};

export default Cart;
