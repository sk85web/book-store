import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { IBooksStore } from '../../types';
import { loadSelectedBook } from '../../redux/actionCreators/bookActionCreator';
import { ArrowIcon } from '../../components/Icons/ArrowIcon';
import BookInfo from '../../components/Books/BookInfo/BookInfo';

const BookInfoPage = () => {
  const { isbn13 = '' } = useParams();

  const selectedBook = useSelector((state: IBooksStore) => state.selectedBook);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSelectedBook(isbn13));
  }, [isbn13]);

  return (
    <div>
      <ArrowIcon />
      <BookInfo />
    </div>
  );
};

export default BookInfoPage;
