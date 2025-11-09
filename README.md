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
- **Distribution Matrix** - Smart content distribution across channels

### Analytics & Insights
- **Performance Analytics** - Track engagement, reach, and conversions
- **Advanced Analytics** - Custom metrics, detailed reports, and data exports
- **Content Performance** - Analyze top-performing content across channels
- **Smart Insights** - AI-powered recommendations and opportunities
- **Audience Analytics** - Segment analysis and growth tracking
- **Revenue Tracking** - Monitor revenue streams and ROI
- **Performance Monitoring** - System health and uptime statistics

### AI & Automation
- **AI Content Generation** - Generate posts with AI assistance
- **AI Studio** - AI personas, tone options, and smart replies
- **AI Assistant** - Get help with content, analytics, and optimization
- **Automation Rules** - Create automated workflows for social media
- **Automation Templates** - Pre-built automation templates
- **Content Recycling** - Automatically repost top-performing content
- **Content Repurposing** - Transform content into multiple formats

### Collaboration & Team
- **Team Management** - Role-based permissions and collaboration
- **Approval Workflows** - Multi-step content approval process
- **Real-time Collaboration** - Live updates and mentions
- **Activity Logs** - Track team actions and changes
- **Team Presence** - See who's online and what they're working on

### Workflow & Process Management
- **Workflow Management** - Create and manage automated workflows
- **Workflow Templates** - Pre-built workflow templates for common tasks
- **Workflow Triggers** - Schedule, event, webhook, and manual triggers
- **Active Workflows** - Monitor running workflows and execution stats

### Advanced Features
- **A/B Testing** - Run experiments to optimize content
- **Social Listening** - Monitor mentions and keywords
- **Influencer Management** - Manage influencer relationships
- **Crisis Management** - Real-time crisis detection and response
- **Social Commerce** - Sell products through social posts
- **Content Moderation** - Automated content filtering
- **Multi-language Support** - Manage content across multiple languages
- **Advanced Search** - Powerful search with saved searches and filters

### Integrations & API
- **API Management** - Manage API keys and endpoints
- **Webhooks** - Real-time event notifications
- **Custom Integrations** - Build your own integrations
- **Integration Builder** - Visual integration creation tools
- **Export & Import** - Export data in multiple formats (CSV, JSON, PDF, XLSX)
- **Import Sources** - Import from Google Drive, Dropbox, and more

### Security & Compliance
- **Security Monitoring** - Track security logs and sessions
- **Compliance** - GDPR, CCPA, and SOC 2 compliance tools
- **Audit Logs** - Complete audit trail
- **Backup & Restore** - Automated backups and restore points
- **Backup Schedules** - Configure automatic backup schedules
- **Restore Points** - Create and manage restore points

### Data Management
- **Export Formats** - CSV, JSON, PDF, XLSX support
- **Export History** - Track all data exports
- **Data Exports** - Export analytics and content data
- **Backup History** - View backup history and download backups

### Brand & Content
- **Brand Management** - Manage brand assets and guidelines
- **Brand Assets** - Logo, colors, templates, and more
- **Brand Guidelines** - Typography, colors, and spacing standards
- **Brand Usage** - Track brand usage across platforms
- **Content Performance** - Detailed content analytics
- **Content Versions** - Version control for content

### Additional Features
- **Help Center** - Documentation and support
- **Changelog** - Release notes and upcoming features
- **Mobile Apps** - iOS and Android applications
- **White Label** - Customize the platform with your brand
- **Notifications Center** - Multi-channel notification system
- **Settings** - Workspace configuration and preferences
- **Billing** - Subscription and usage management
- **Performance Tracking** - Track post performance metrics

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
