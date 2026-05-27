import { describe, expect, it } from 'vitest';

import { emailVerificationParams, visibleAccountTabs } from './account-navigation';

describe('account navigation helpers', () => {
  it('shows admin tabs only for admin-labeled users', () => {
    const tabs = [{ id: 'user' }, { id: 'products', adminOnly: true }];

    expect(visibleAccountTabs(tabs).map(tab => tab.id)).toEqual(['user']);
    expect(visibleAccountTabs(tabs, ['admin']).map(tab => tab.id)).toEqual(['user', 'products']);
  });

  it('extracts email verification params only when both values are present', () => {
    expect(emailVerificationParams('?userId=user-1&secret=secret-1')).toEqual({
      userId: 'user-1',
      secret: 'secret-1',
    });
    expect(emailVerificationParams('?userId=user-1')).toBeNull();
  });
});
