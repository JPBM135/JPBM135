export function isBase64(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  return /^data:image\/[a-z]+;base64,/.test(value);
}
