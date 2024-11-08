import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
  'X-XSS-Protection': '0',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'interest-cohort=()',
};

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));

  return response;
};
