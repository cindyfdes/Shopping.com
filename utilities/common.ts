export const truncate = (text: string, textLength: number) => {
  return text.length > textLength
    ? text.substring(0, textLength - 2) + "..."
    : text;
};
