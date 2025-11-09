# 1Social Dashboard

A vibrant mock front-end that lets you compose once and simulate sharing to Farcaster and Instagram at the same time. This release focuses on the UI; backend delivery will follow.

## Fundamentals
- Compose a story, pick destinations, and see a synchronized activity feed driven by mock data.
- Reown AppKit powers wallet connection (Farcaster signing) alongside Wagmi and Viem.
- Built with the Next.js App Router and kept client-side only for now.

## Installation
```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

Create a project on the [Reown dashboard](https://dashboard.reown.com) and expose the ID as `NEXT_PUBLIC_PROJECT_ID` in your environment.

## Development
```bash
npm run dev
```

Then visit http://localhost:3000 to explore the dashboard mock.

## Stack
- Next.js + Tailwind utility classes for layout and styling
- Reown AppKit with the Wagmi adapter
- Wagmi, Viem, and @tanstack/react-query for future data fetching
