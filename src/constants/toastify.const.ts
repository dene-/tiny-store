import Toastify from 'toastify-js';

export const toastifyDefaults: Toastify.Options = {
  duration: 3000,
  gravity: 'bottom',
  position: 'right',
  backgroundColor: 'var(--color-primary)',
  style: {
    borderRadius: 'var(--radius-field)',
  },
};
