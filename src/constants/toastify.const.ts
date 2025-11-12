import Toastify from 'toastify-js';

export const toastifyDefaults: Toastify.Options = {
  duration: 3000,
  gravity: 'top',
  position: 'right',
  offset: {
    x: 20,
    y: 80,
  },
  style: {
    borderRadius: 'var(--radius-field)',
    background: 'var(--color-primary)',
  },
};
