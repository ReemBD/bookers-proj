import { ReactNode } from 'react';

export interface INavItem {
  className: string;
  to: string;
  title: ReactNode;
}
