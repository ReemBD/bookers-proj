import {
  put,
  all,
  takeLatest,
  delay,
  call,
  takeEvery,
} from '@redux-saga/core/effects';
import { Book, GoogleBook } from 'lib/models/Book.interface';
import {
  AddBookPayload,
  DeleteBookPayload,
  LoadBooksPayload,
  SetBookFilterPayload,
  UpdateBookPayload,
} from 'lib/models/StoreActions.types';
import toast from 'react-hot-toast';
import { bookService } from 'services/bookService';
import {
  addBookAsync,
  deleteBookAsync,
  loadBooksAsync,
  setBookMsg,
  updateBookAsync,
} from 'store/actions/bookActions';

function* loadBooks({
  payload: { bookFilter },
}: {
  type: 'LOAD_BOOKS';
  payload: LoadBooksPayload;
}) {
  try {
    const books: Book[] = yield call(() => bookService.query(bookFilter));
    yield put(
      loadBooksAsync({
        books,
      })
    );
  } catch (err) {
    setBookMsg({
      msg: {
        content: 'There was a problem trying to load books',
        type: 'error',
      },
    });
  }
}

function* deleteBook({
  payload: { bookId },
}: {
  payload: DeleteBookPayload;
  type: 'DELETE_BOOK';
}) {
  try {
    yield call(() => bookService.deleteBook(bookId));
    yield put(
      deleteBookAsync({
        bookId,
      })
    );
    yield put(
      setBookMsg({
        msg: {
          content: 'Book deleted successfuly',
          type: 'success',
        },
      })
    );
  } catch (err) {
    yield put(
      setBookMsg({
        msg: {
          content: `There was a problem deleting book ${bookId}`,
          type: 'error',
        },
      })
    );
  }
}

function* updateBook({
  payload: { book },
}: {
  type: 'UPDATE_BOOK';
  payload: UpdateBookPayload;
}) {
  try {
    yield call(() => bookService.save(book));
    yield put(
      updateBookAsync({
        book,
      })
    );
    yield put(
      setBookMsg({
        msg: {
          content: 'Book updated successfuly',
          type: 'success',
        },
      })
    );
  } catch (err) {
    yield put(
      setBookMsg({
        msg: {
          content: `There was a problem updating book ${book.id}`,
          type: 'error',
        },
      })
    );
  }
}

function* addBook({
  payload: { book },
}: {
  type: 'ADD_BOOK';
  payload: AddBookPayload;
}): Generator<any> {
  try {
    const newBook: GoogleBook = yield call(() =>
      bookService.addGoogleBook(book)
    );
    yield put(addBookAsync({ book: newBook }));
    yield put(
      setBookMsg({
        msg: {
          content: 'Added book successfully',
          type: 'success',
        },
      })
    );
  } catch (err) {
    yield put(
      setBookMsg({
        msg: {
          content: "Couldn't add book",
          type: 'error',
        },
      })
    );
  }
}

export function* bookSagas() {
  yield all([
    takeEvery('LOAD_BOOKS', loadBooks),
    takeEvery('DELETE_BOOK', deleteBook),
    takeEvery('UPDATE_BOOK', updateBook),
    takeEvery('ADD_BOOK', addBook),
  ]);
}
