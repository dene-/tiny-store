import { describe, expect, it } from 'vitest';

import { accountVerificationUrl } from './session-store-deps';

describe('session store dependencies', () => {
  it('builds account verification URLs from the current origin', () => {
    expect(accountVerificationUrl('https://store.example')).toBe('https://store.example/account');
  });
});
