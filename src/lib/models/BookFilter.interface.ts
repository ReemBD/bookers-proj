import { Book } from './Book.interface';

export interface BookFilter {
  publishedDate: {
    value: string | Date | number;
    before: boolean;
  };
  amount: {
    value: number;
    lessThan: boolean;
  };
  freeTxt: string;
}
