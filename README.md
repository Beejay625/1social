# 1Social Dashboard

A comprehensive social media management platform built with Next.js. Compose once and share to multiple platforms (Farcaster, Instagram, X, Lens, Mirror) with advanced analytics, automation, and AI-powered features.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Features

### Core Features
- **Multi-platform Publishing** - Publish to Farcaster, Instagram, X, Lens, and Mirror simultaneously
- **Content Scheduling** - Advanced calendar with best-time optimization
- **Workflow Automation** - Approval workflows and automated publishing
- **Content Library** - Organize and manage your content assets

### Analytics & Insights
- **Performance Analytics** - Track engagement, reach, and conversions
- **Advanced Analytics** - Custom metrics and detailed reports
- **Smart Insights** - AI-powered recommendations and opportunities
- **Audience Analytics** - Segment analysis and growth tracking

### AI & Automation
- **AI Content Generation** - Generate posts with AI assistance
- **AI Assistant** - Get help with content, analytics, and optimization
- **Automation Rules** - Create automated workflows for social media
- **Content Recycling** - Automatically repost top-performing content

### Collaboration & Team
- **Team Management** - Role-based permissions and collaboration
- **Approval Workflows** - Multi-step content approval process
- **Real-time Collaboration** - Live updates and mentions
- **Activity Logs** - Track team actions and changes

### Advanced Features
- **A/B Testing** - Run experiments to optimize content
- **Social Listening** - Monitor mentions and keywords
- **Influencer Management** - Manage influencer relationships
- **Crisis Management** - Real-time crisis detection and response
- **Social Commerce** - Sell products through social posts
- **Content Moderation** - Automated content filtering

### Integrations & API
- **API Management** - Manage API keys and endpoints
- **Webhooks** - Real-time event notifications
- **Custom Integrations** - Build your own integrations
- **Export/Import** - Export data in multiple formats

### Security & Compliance
- **Security Monitoring** - Track security logs and sessions
- **Compliance** - GDPR, CCPA, and SOC 2 compliance tools
- **Audit Logs** - Complete audit trail
- **Backup & Restore** - Automated backups and restore points

### Additional Features
- **Help Center** - Documentation and support
- **Changelog** - Release notes and upcoming features
- **Mobile Apps** - iOS and Android applications
- **Brand Guidelines** - Brand asset management
- **White Label** - Customize the platform with your brand
- **Notifications** - Multi-channel notification system
- **Settings** - Workspace configuration and preferences
- **Billing** - Subscription and usage management

## Tech Stack

- **Next.js** (App Router) - React framework
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **Reown AppKit** + **Wagmi** + **Viem** - Wallet connection
- **@tanstack/react-query** - Data fetching

## Environment

Set `NEXT_PUBLIC_PROJECT_ID` from your [Reown dashboard](https://dashboard.reown.com).

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── data/             # Mock data modules
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── constants/        # Constants and configuration
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
