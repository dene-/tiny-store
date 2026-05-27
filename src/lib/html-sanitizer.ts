const blockedElementPattern = /<\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)\b[\s\S]*?<\/\s*\1\s*>/gi;
const blockedTagPattern = /<\/?\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)\b[^>]*>/gi;
const eventAttributePattern = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const styleAttributePattern = /\s+style\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const srcdocAttributePattern = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const dangerousUrlAttributePattern = /\s+(href|src|xlink:href|action|formaction)\s*=\s*(["'])\s*(?:javascript|data):[\s\S]*?\2/gi;
const dangerousUnquotedUrlAttributePattern = /\s+(href|src|xlink:href|action|formaction)\s*=\s*(?:javascript|data):[^\s>]*/gi;

export const sanitizeProductHtml = (html: string) =>
  html
    .replace(blockedElementPattern, '')
    .replace(blockedTagPattern, '')
    .replace(eventAttributePattern, '')
    .replace(styleAttributePattern, '')
    .replace(srcdocAttributePattern, '')
    .replace(dangerousUrlAttributePattern, '')
    .replace(dangerousUnquotedUrlAttributePattern, '')
    .trim();

export const sanitizeProductText = (html: string) =>
  sanitizeProductHtml(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
