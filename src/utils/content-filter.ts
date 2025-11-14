export function filterProfanity(content: string): string {
  const profanityWords = ['bad', 'word']; // Add actual profanity filter
  let filtered = content;
  profanityWords.forEach(word => {
    filtered = filtered.replace(new RegExp(word, 'gi'), '*'.repeat(word.length));
  });
  return filtered;
}

export function sanitizeContent(content: string): string {
  return content.trim().replace(/\s+/g, ' ');
}


