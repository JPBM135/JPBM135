const LENGTH_THRESHOLD = 5 as const;

export function fileEllipsis(value: string, length: number) {
  const extension = value.split('.').pop();
  const fileName = value.split('.').slice(0, -1).join('.');

  if (value.length <= length) {
    return value;
  }

  return [
    fileName.slice(0, length - LENGTH_THRESHOLD),
    '...',
    fileName.slice(-LENGTH_THRESHOLD),
    '.',
    extension,
  ].join('');
}
