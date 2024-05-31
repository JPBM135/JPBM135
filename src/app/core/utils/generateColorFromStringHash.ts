export function getHexColorFormStringHash(
  str: string,
  opacity = 'FF',
  lightCoefficient = 0,
): string {
  let hash = 0;

  for (const char of str) {
    hash = (char.codePointAt(0) ?? 0) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let index = 0; index < 3; index++) {
    let value = (hash >> (index * 8)) & 0xff;
    value = Math.min(value + lightCoefficient, 255);
    color += value.toString(16).padStart(2, '00');
  }

  return color + opacity;
}
