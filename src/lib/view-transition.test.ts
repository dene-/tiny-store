import { describe, expect, it, vi } from 'vitest';

import { runViewTransition, type ViewTransitionDocument } from './view-transition';

describe('view transition helper', () => {
  it('does nothing when the browser does not support view transitions', () => {
    expect(runViewTransition({}, { complete: Promise.resolve() })).toBeUndefined();
  });

  it('starts a supported view transition and waits for navigation completion inside the callback', async () => {
    const documentRef: ViewTransitionDocument = {
      startViewTransition: vi.fn(callback => {
        void callback();
      }),
    };

    await expect(runViewTransition(documentRef, { complete: Promise.resolve() })).resolves.toBeUndefined();
    expect(documentRef.startViewTransition).toHaveBeenCalledOnce();
  });
});
