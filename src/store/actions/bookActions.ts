import {
  AddBook,
  AddBookPayload,
  DeleteBook,
  DeleteBookPayload,
  LoadBooks,
  LoadBooksPayload,
  SetBookFilter,
  SetBookFilterPayload,
  SetBookMsg,
  SetBookMsgPayload,
  UpdateBook,
  UpdateBookPayload,
} from 'lib/models/StoreActions.types';

export const loadBooksAction = (payload: LoadBooksPayload): LoadBooks => ({
  type: 'LOAD_BOOKS',
  payload,
});

export const loadBooksAsync = (payload: LoadBooksPayload): LoadBooks => ({
  type: 'LOAD_BOOKS_ASYNC',
  payload,
});

export const deleteBookAction = (payload: DeleteBookPayload): DeleteBook => ({
  type: 'DELETE_BOOK',
  payload,
});

export const deleteBookAsync = (payload: DeleteBookPayload): DeleteBook => ({
  type: 'DELETE_BOOK_ASYNC',
  payload,
});

export const updateBookAction = (payload: UpdateBookPayload): UpdateBook => ({
  type: 'UPDATE_BOOK',
  payload,
});

export const updateBookAsync = (payload: UpdateBookPayload): UpdateBook => ({
  type: 'UPDATE_BOOK_ASYNC',
  payload,
});

export const addBookAction = (payload: AddBookPayload): AddBook => ({
  type: 'ADD_BOOK',
  payload,
});

export const addBookAsync = (payload: AddBookPayload): AddBook => ({
  type: 'ADD_BOOK_ASYNC',
  payload,
});

export const setBookFilterAction = (
  payload: SetBookFilterPayload
): SetBookFilter => ({
  type: 'SET_BOOK_FILTER',
  payload,
});

export const setBookMsg = (payload: SetBookMsgPayload): SetBookMsg => ({
  type: 'SET_BOOK_MSG',
  payload,
});
