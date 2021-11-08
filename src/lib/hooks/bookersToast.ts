import toast, { Toast } from 'react-hot-toast';

let newToast: any = { ...toast };

Object.keys(newToast).forEach((key) => {
  newToast[key] = (message: string, opts: any) => {
    (toast as any)[key](message, {
      ...opts,
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };
});

export const bookersToast = newToast;
