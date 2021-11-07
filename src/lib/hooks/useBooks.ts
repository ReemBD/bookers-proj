import { Book, GoogleBook } from 'lib/models/Book.interface';
import { BookFilter } from 'lib/models/BookFilter.interface';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookAction,
  deleteBookAction,
  loadBooksAction,
  setBookFilterAction,
  updateBookAction,
} from 'store/actions/bookActions';
import { RootState } from 'store/reducers/rootReducer';

export const useBooks = () => {
  const bookState = useSelector((state: RootState) => state.bookModule);
  const dispatch = useDispatch();

  const bookActions = {
    loadBooks(bookFilter: BookFilter) {
      dispatch(loadBooksAction({ bookFilter }));
    },
    deleteBook(bookId: string) {
      dispatch(deleteBookAction({ bookId }));
    },
    updateBook(book: Book) {
      dispatch(updateBookAction({ book }));
    },
    addBook(book: GoogleBook) {
      dispatch(addBookAction({ book }));
    },
    setBookFilter(bookFilter: BookFilter) {
      dispatch(setBookFilterAction({ bookFilter }));
    },
  };

  return { ...bookState, ...bookActions };
};
