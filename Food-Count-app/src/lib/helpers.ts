export const getUserInitials = (name: string): string => {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2); // Limit to 2 characters
    return initials;
  };


export const generateDynamicColor = (input: string): string => {
    const hash = input
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const color = `hsl(${hash % 360}, 70%, 80%)`; // Generates a pastel color
    return color;
  };