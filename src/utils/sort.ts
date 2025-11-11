export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function sortByDate(array: { date: Date }[], order: 'asc' | 'desc' = 'asc'): typeof array {
  return [...array].sort((a, b) => {
    const aTime = a.date.getTime();
    const bTime = b.date.getTime();
    return order === 'asc' ? aTime - bTime : bTime - aTime;
  });
}

