import { useDispatch, useSelector } from 'react-redux';

import { ArrowSliderIcon } from '../Icons/ArrowSliderIcon';
import './Pagination.css';
import {
  setCurrentPage,
  loadSearchBooks,
} from '../../redux/actionCreators/bookActionCreator';
import { IStoreState } from '../../types';

const Pagination = () => {
  const currentPage = useSelector((state: IStoreState) => state.books.currentPage);
  const books = useSelector((state: IStoreState) => state.books.books);
  const total = useSelector((state: IStoreState) => state.books.searchTotal);
  const query = useSelector((state: IStoreState) => state.books.query);

  const pagesCount = Math.ceil(+total / 10);
  const dispatch = useDispatch();

  const handlePrevPage = () => {
    if (+currentPage === 1) return;
    const newPage = +currentPage - 1;
    dispatch(setCurrentPage(newPage.toString()));
    dispatch(loadSearchBooks({ total, books, page: newPage.toString(), search: query }));
  };

  const handleNextPage = () => {
    if (+currentPage === pagesCount) return;
    const newPage = +currentPage + 1;
    dispatch(setCurrentPage(newPage.toString()));
    dispatch(loadSearchBooks({ total, books, page: newPage.toString(), search: query }));
  };

  return (
    <div className="pagination">
      <div className="arrow-block">
        <ArrowSliderIcon className="left" onClick={handlePrevPage} />
        <span className="">Prev</span>
      </div>
      <span>{currentPage}</span>
      <div className="arrow-block">
        <span className="">Next</span>
        <ArrowSliderIcon className="right" onClick={handleNextPage} />
      </div>
    </div>
  );
};

export default Pagination;
