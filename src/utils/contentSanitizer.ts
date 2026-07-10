const COMMON_MOJIBAKE_FIXES: Array<[RegExp, string]> = [
  [/\u00e2\u201a\u00b9/g, '\u20b9'],
  [/\u00c2\u00b7|\u00e2\u20ac\u00a2/g, '\u2022'],
  [/\u00e2\u20ac\u201d/g, '\u2014'],
  [/\u00e2\u20ac\u201c/g, '\u2013'],
  [/\u00e2\u20ac\u0153/g, '\u201c'],
  [/\u00e2\u20ac\u009d/g, '\u201d'],
  [/\u00e2\u20ac\u02dc/g, '\u2018'],
  [/\u00e2\u20ac\u2122/g, '\u2019'],
  [/\u00e2\u20ac\u00a6/g, '\u2026'],
  [/\u00c2/g, ''],
];

const GARBLED_PATTERN = /(\u00c3.|\u00c2|\u00e2.|\u00e0\u00a4|\u00f0\u0178|\u00ef\u00b8)/;

function latin1ToUtf8(input: string): string {
  const bytes = Uint8Array.from(Array.from(input, (char) => char.charCodeAt(0) & 0xff));
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

function shouldUseDecoded(original: string, decoded: string): boolean {
  if (!decoded || decoded === original) return false;

  const originalGarbled = (original.match(/(\u00c3|\u00c2|\u00e2|\u00e0\u00a4|\u00ef|\u00f0)/g) || []).length;
  const decodedGarbled = (decoded.match(/(\u00c3|\u00c2|\u00e2|\u00e0\u00a4|\u00ef|\u00f0)/g) || []).length;

  if (decodedGarbled < originalGarbled) return true;
  if (original.includes('\u00e0\u00a4') && /[\u0900-\u097f]/.test(decoded)) return true;
  if ((original.includes('\u00e2') || original.includes('\u00c3') || original.includes('\u00c2')) && !decoded.includes('\u00e2')) return true;

  return false;
}

export function sanitizeTextContent(value: string): string {
  if (!value || typeof value !== 'string') return value;

  let output = value;
  for (const [pattern, replacement] of COMMON_MOJIBAKE_FIXES) {
    output = output.replace(pattern, replacement);
  }

  if (GARBLED_PATTERN.test(output)) {
    try {
      const decoded = latin1ToUtf8(output);
      if (shouldUseDecoded(output, decoded)) {
        output = decoded;
      }
    } catch {
      // Best-effort sanitizer: keep partially cleaned output on decode failures.
    }
  }

  return output
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function sanitizeDeepContent<T>(value: T): T {
  if (typeof value === 'string') {
    return sanitizeTextContent(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDeepContent(item)) as unknown as T;
  }

  if (value && typeof value === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      sanitized[key] = sanitizeDeepContent(item);
    }
    return sanitized as T;
  }

  return value;
}
