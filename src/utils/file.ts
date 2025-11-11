export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function getFileName(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}

export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = getFileExtension(filename).toLowerCase();
  return allowedTypes.includes(extension);
}

