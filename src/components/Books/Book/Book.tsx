import { IBook } from '../../../types';
import BookImageContainer from '../BookImageContainer/BookImageContainer';
import StarRating from '../../StarRating/StarRating';

type BookProps = Pick<IBook, 'image' | 'title' | 'price' | 'isbn13' | 'rating'>;

const Book = ({ image, title, price, isbn13, rating }: BookProps) => {
  return (
    <div className="book">
      <BookImageContainer image={image} />
      <div className="book-content">
        <h2 className="book-title">{title}</h2>
        <span className="book-author">by Lentin Joseph, Apress 2018</span>
        <div className="book-footer">
          <span className="book-price">{price}</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default Book;
