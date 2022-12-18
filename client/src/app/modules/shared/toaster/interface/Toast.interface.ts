import { ToastType } from '../enum';

export interface Toast {
    type: ToastType;
    title: string;
    body: string;
    delay: number;
  }
  