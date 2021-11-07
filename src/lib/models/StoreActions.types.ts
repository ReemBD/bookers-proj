import { Book, GoogleBook } from './Book.interface';
import { BookFilter } from './BookFilter.interface';

export type BookAction =
  | LoadBooks
  | DeleteBook
  | UpdateBook
  | AddBook
  | SetBookFilter
  | SetBookMsg;

export interface LoadBooksPayload {
  books?: Book[];
  bookFilter?: BookFilter;
}

export interface LoadBooks {
  type: 'LOAD_BOOKS_ASYNC' | 'LOAD_BOOKS';
  payload: any;
}

export interface DeleteBookPayload {
  bookId: string;
}

export interface DeleteBook {
  type: 'DELETE_BOOK_ASYNC' | 'DELETE_BOOK';
  payload: DeleteBookPayload;
}

export interface UpdateBookPayload {
  book: Book;
}

export interface UpdateBook {
  type: 'UPDATE_BOOK' | 'UPDATE_BOOK_ASYNC';
  payload: UpdateBookPayload;
}

export interface AddBookPayload {
  book: GoogleBook;
}

export interface AddBook {
  type: 'ADD_BOOK' | 'ADD_BOOK_ASYNC';
  payload: AddBookPayload;
}

export interface SetBookFilterPayload {
  bookFilter: BookFilter;
}

export interface SetBookFilter {
  type: 'SET_BOOK_FILTER' | 'SET_BOOK_FILTER_SAGA';
  payload: SetBookFilterPayload;
}

export interface SetBookMsgPayload {
  msg: {
    content: string;
    type: any;
  };
}

export interface SetBookMsg {
  type: 'SET_BOOK_MSG';
  payload: SetBookMsgPayload;
}
