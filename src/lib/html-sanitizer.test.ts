import { describe, expect, it } from 'vitest';

import { sanitizeProductHtml, sanitizeProductText } from './html-sanitizer';

describe('sanitizeProductHtml', () => {
  it('removes executable markup and keeps basic product formatting', () => {
    const html = `
      <p onclick="steal()">Safe <strong>description</strong></p>
      <script>alert('xss')</script>
      <a href="javascript:alert(1)" onmouseover="steal()">bad link</a>
      <a href="https://example.com/product">good link</a>
    `;

    const sanitized = sanitizeProductHtml(html);

    expect(sanitized).toContain('<p>Safe <strong>description</strong></p>');
    expect(sanitized).toContain('<a>bad link</a>');
    expect(sanitized).toContain('<a href="https://example.com/product">good link</a>');
    expect(sanitized).not.toContain('<script');
    expect(sanitized).not.toContain('onclick');
    expect(sanitized).not.toContain('onmouseover');
    expect(sanitized).not.toContain('javascript:');
  });
});

describe('sanitizeProductText', () => {
  it('converts sanitized product markup to safe display text', () => {
    const text = sanitizeProductText('<p>Hello <strong>world</strong></p><script>alert(1)</script><br><span>Next</span>');

    expect(text).toBe('Hello world Next');
  });
});
