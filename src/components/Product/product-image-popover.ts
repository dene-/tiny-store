export const PRODUCT_IMAGE_POPOVER_LOCK_CLASS = 'has-product-image-popover';

export interface ClassListTarget {
  classList: {
    toggle(token: string, force?: boolean): boolean;
  };
}

export function setProductImagePopoverLock(target: ClassListTarget, isOpen: boolean) {
  target.classList.toggle(PRODUCT_IMAGE_POPOVER_LOCK_CLASS, isOpen);
}
