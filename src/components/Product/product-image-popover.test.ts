import { describe, expect, it, vi } from 'vitest';

import { PRODUCT_IMAGE_POPOVER_LOCK_CLASS, setProductImagePopoverLock } from './product-image-popover';

describe('product image popover helpers', () => {
  it('toggles the document lock class from popover state', () => {
    const toggle = vi.fn();

    setProductImagePopoverLock({ classList: { toggle } }, true);

    expect(toggle).toHaveBeenCalledWith(PRODUCT_IMAGE_POPOVER_LOCK_CLASS, true);
  });
});
