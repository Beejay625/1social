# 1Social Dashboard

A comprehensive social media management platform built with Next.js. Compose once and share to multiple platforms (Farcaster, Instagram, X, Lens, Mirror) with advanced analytics, automation, and AI-powered features.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Features

### Core Publishing
- **Multi-platform Publishing** - Publish to Farcaster, Instagram, X, Lens, and Mirror simultaneously
- **Content Scheduling** - Advanced calendar with best-time optimization and time slot recommendations
- **Content Library** - Organize and manage media assets, templates, and reusable content
- **Content Recycling** - Automatically repost top-performing content to maximize reach
- **Video Management** - Upload, manage, and analyze video content across platforms

### Analytics & Insights
- **Performance Analytics** - Track engagement, reach, conversions, and impressions
- **Advanced Analytics** - Custom metrics, detailed reports, and data exports
- **Smart Insights** - AI-powered recommendations, opportunities, and actionable insights
- **Audience Analytics** - Segment analysis, growth tracking, and demographic insights
- **Performance Comparison** - Compare metrics against previous periods
- **Performance Tracking** - Detailed tracking for individual posts and content pieces
- **Engagement Analytics** - Track likes, comments, shares, and saves

### AI & Automation
- **AI Content Generation** - Generate posts with AI assistance
- **AI Assistant** - Get help with content creation, analytics, and optimization
- **Automation Rules** - Create automated workflows for social media
- **Workflow Automation** - Multi-step approval workflows and automated publishing
- **Engagement Tools** - Auto-reply, mention tracking, and comment moderation

### Collaboration & Team
- **Team Management** - Role-based permissions and collaboration
- **Approval Workflows** - Multi-step content approval process
- **Real-time Collaboration** - Live updates, mentions, and activity logs
- **Activity Logs** - Track team actions and changes

### Advanced Features
- **A/B Testing & Experiments** - Run experiments to optimize content strategy
- **Social Listening** - Monitor mentions, keywords, and brand conversations
- **Trend Tracking** - Track trending topics and hashtags
- **Influencer Management** - Manage influencer relationships and collaboration campaigns
- **Crisis Management** - Real-time crisis detection and response templates
- **Competitor Analysis** - Track competitor performance and benchmark metrics
- **Scheduling Optimization** - AI-powered recommendations for optimal posting times

### Commerce & Monetization
- **Social Commerce** - Sell products directly through social media posts
- **Product Catalog** - Manage products and track sales performance
- **Shopping Posts** - Track clicks, conversions, and revenue from social posts

### Integrations & API
- **API Management** - Manage API keys, endpoints, and rate limits
- **Webhooks** - Real-time event notifications
- **Custom Integrations** - Build your own integrations with templates
- **Calendar Integration** - Sync with external calendar platforms
- **Export/Import** - Export data in CSV, Excel, PDF, and JSON formats

### Security & Compliance
- **Security Monitoring** - Track security logs, active sessions, and system alerts
- **Compliance** - GDPR, CCPA, and SOC 2 compliance tools
- **Audit Logs** - Complete audit trail for all actions
- **Backup & Restore** - Automated backups, schedules, and restore points
- **Data Retention** - Configure data retention policies

### Reporting & Documentation
- **Custom Reporting** - Create and schedule custom reports
- **Report Templates** - Pre-built report templates for common use cases
- **Help Center** - Documentation, tutorials, and support tickets
- **Changelog** - Release notes and upcoming features
- **Developer Tools** - API documentation, SDKs, and code examples

### Platform Features
- **Mobile Apps** - iOS and Android applications with push notifications
- **Brand Guidelines** - Brand asset management and usage tracking
- **White Label** - Customize the platform with your brand identity
- **Settings** - Workspace configuration, notifications, and preferences
- **Billing** - Subscription management, usage tracking, and invoice history
- **Search** - Advanced search with filters, saved searches, and suggestions
- **Notifications** - Multi-channel notification system (email, push, SMS, Slack)

### Performance & Monitoring
- **Performance Monitoring** - System health metrics, uptime statistics, and alerts
- **Content Moderation** - Automated content filtering and moderation rules
- **Moderation Queue** - Review flagged content and manage moderation workflows

## Tech Stack

- **Next.js** (App Router) - React framework with server-side rendering
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Reown AppKit** + **Wagmi** + **Viem** - Wallet connection and Web3 integration
- **@tanstack/react-query** - Data fetching and caching

## Environment Setup

Set `NEXT_PUBLIC_PROJECT_ID` from your [Reown dashboard](https://dashboard.reown.com).

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   └── page.tsx      # Main dashboard component
├── data/             # Mock data modules
│   ├── dashboard.ts  # Core dashboard data
│   ├── ai.ts         # AI-related data
│   ├── analytics.ts  # Analytics data
│   ├── api.ts        # API management data
│   ├── automation.ts # Automation data
│   └── ...           # More data modules
├── types/            # TypeScript type definitions
│   └── publishing.ts # Shared types
├── utils/            # Utility functions
│   ├── account.ts    # Account utilities
│   ├── charts.ts     # Chart utilities
│   ├── metrics.ts    # Metric formatting
│   ├── progress.ts   # Progress calculations
│   └── time.ts       # Time formatting
└── constants/        # Constants and configuration
    ├── channelCatalog.ts # Channel definitions
    └── statusTokens.ts   # Status styling tokens
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

## Key Capabilities

- **30+ Feature Sections** covering all aspects of social media management
- **Modular Architecture** with separated data, types, utilities, and constants
- **Type-Safe** with comprehensive TypeScript definitions
- **Responsive Design** with Tailwind CSS
- **Web3 Ready** with wallet integration via Reown AppKit

## License

MIT
