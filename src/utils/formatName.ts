export function formatName(fullName: string): string {
  const words = fullName.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}

export function getInitials(fullName: string): string {
  const words = fullName.split(" ");

  const initials = words.map((word) => word.charAt(0).toUpperCase());

  return initials.join("");
}
