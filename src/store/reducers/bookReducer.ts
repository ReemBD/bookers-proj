import { Book } from 'lib/models/Book.interface';
import { BookFilter } from 'lib/models/BookFilter.interface';
import { BookAction } from 'lib/models/StoreActions.types';

const initialState: {
  books: Book[];
  bookMsg: { content: string; type: any };
  bookFilter: BookFilter;
} = {
  books: [],
  bookFilter: {
    publishedDate: {
      value: '',
      before: false,
    },
    amount: {
      value: 0,
      lessThan: false,
    },
    freeTxt: '',
  },
  bookMsg: {
    content: '',
    type: '',
  },
};

export function bookReducer(state = initialState, action: BookAction) {
  switch (action.type) {
    case 'LOAD_BOOKS_ASYNC':
      return { ...state, books: action.payload.books };
    case 'DELETE_BOOK_ASYNC':
      return {
        ...state,
        books: state.books.filter(({ id }) => id !== action.payload.bookId),
      };
    case 'UPDATE_BOOK_ASYNC':
      return {
        ...state,
        books: state.books.map((currBook) =>
          currBook.id === action.payload.book.id
            ? action.payload.book
            : currBook
        ),
      };
    case 'ADD_BOOK_ASYNC':
      return {
        ...state,
        books: [action.payload.book, ...state.books],
      };
    case 'SET_BOOK_FILTER':
      return { ...state, bookFilter: action.payload.bookFilter };
    case 'SET_BOOK_MSG':
      return {
        ...state,
        bookMsg: action.payload.msg,
      };
    default:
      return state;
  }
}
