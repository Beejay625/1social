export function validatePostContent(content: string): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Content cannot be empty' };
  }
  if (content.length > 10000) {
    return { valid: false, error: 'Content is too long (max 10000 characters)' };
  }
  return { valid: true };
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

