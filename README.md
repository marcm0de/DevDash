# DevDash ⚡

A minimal developer dashboard — your browser start page, rebuilt for productivity.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## Features

- **🕐 Clock** — Large time display with date and timezone
- **🔍 Search** — Multi-engine search bar (Google / DuckDuckGo / GitHub)
- **🔗 Quick Links** — Customizable link grid with emoji icons
- **📝 Notepad** — Scratchpad with auto-save to localStorage
- **✅ Todos** — Simple checklist with add/complete/delete
- **🐙 GitHub Feed** — Recent activity feed (mock data)
- **👋 Greeting** — Time-aware greeting with dev quotes
- **⌨️ Keyboard Shortcuts** — Navigate without touching the mouse

## Design

- Ultra-minimal dark theme (`#0a0a0a`)
- Green terminal accent (`#22c55e`)
- Monospace typography throughout
- Responsive grid layout
- Zero clutter, pure productivity

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Ctrl+L` | Add link |
| `Ctrl+T` | Add todo |
| `Ctrl+/` | Cycle search engine |
| `?` | Toggle shortcuts panel |

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) — State management + localStorage persistence
- [Lucide React](https://lucide.dev/) — Icons
- [date-fns](https://date-fns.org/) — Date formatting

## Data Persistence

All user data (notes, todos, links, preferences) is stored in `localStorage` via Zustand's persist middleware. No backend required.

## License

[MIT](LICENSE)
