const quotes = [
  "Ship it.",
  "Code is read more than it is written.",
  "Make it work, make it right, make it fast.",
  "The best error message is the one that never shows up.",
  "Simplicity is the ultimate sophistication.",
  "First, solve the problem. Then, write the code.",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Any fool can write code that a computer can understand.",
  "Premature optimization is the root of all evil.",
  "It works on my machine.",
  "Delete more code than you write.",
  "The only way to go fast is to go well.",
  "Debugging is twice as hard as writing the code.",
  "Keep it simple, stupid.",
  "Done is better than perfect.",
];

export function getQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Good night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}
