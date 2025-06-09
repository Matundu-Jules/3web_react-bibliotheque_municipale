export function cleanDescription(desc?: string): string {
  if (!desc) return '';
  // Supprime les lignes avec >10 underscores consécutifs
  return (
    desc
      .replace(/_{10,}/g, '')
      // Supprime les lignes qui ne contiennent que des underscores ou espaces
      .replace(/^\s*_+\s*$/gm, '')
      .trim()
  );
}
