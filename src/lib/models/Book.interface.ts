import { V4Options } from 'uuid';

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publishedDate: number | Date | string;
  description: string;
  pageCount: number;
  categories: string[];
  thumbnail: string;
  language: string;
  listPrice: {
    amount: number;
    currencyCode: string;
    isOnSale: boolean;
  };
}

export type NewBook = Omit<Book, 'id'>;

export type GoogleBook = any;
