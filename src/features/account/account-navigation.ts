export interface VisibilityTab {
  adminOnly?: boolean;
}

export function visibleAccountTabs<T extends VisibilityTab>(tabs: T[], labels: string[] = []) {
  return tabs.filter(tab => !tab.adminOnly || labels.includes('admin'));
}

export interface EmailVerificationParams {
  userId: string;
  secret: string;
}

export function emailVerificationParams(search: string): EmailVerificationParams | null {
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const secret = params.get('secret');

  if (!userId || !secret) return null;

  return { userId, secret };
}
