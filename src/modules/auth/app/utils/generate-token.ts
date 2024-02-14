const LETTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";

export const generateToken = (length: number = 8) =>
  Array.from({ length }, () => LETTERS.charAt(Math.floor(Math.random() * LETTERS.length))).join("");
