# 1Social - Decentralized Social Media Command Center

The first truly onchain social media management platform built with Next.js. Compose once and publish across decentralized protocols (Farcaster, Lens Protocol, Mirror) and traditional platforms (Instagram, X) with advanced web3-native analytics, automation, and DAO collaboration features.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Features

### Core Publishing & Content
- **Multi-Protocol Publishing** - Compose once and publish onchain to Farcaster, Lens Protocol, Mirror, plus traditional platforms (Instagram, X)
- **Decentralized Content Scheduling** - Schedule posts across protocols with blockchain-verified timestamps
- **AI Studio** - AI-powered content generation optimized for onchain publishing
- **Content Templates** - Pre-built templates for NFTs, Farcaster, Lens publications, and Mirror articles
- **IPFS/Arweave Storage** - Permanent decentralized storage for media assets
- **Content Verification** - Cryptographically verify content authenticity with wallet signatures

### Analytics & Reporting
- **Blockchain Analytics Dashboards** - Real-time performance tracking with onchain data verification
- **Cross-Protocol Performance** - Unified view across Farcaster, Lens, Mirror, and traditional platforms
- **Onchain Content Analytics** - Track views, mints, collects, mirrors, and shares with blockchain-verified metrics
- **NFT Content Performance** - Track collectible post performance, mint rates, and secondary market activity
- **Wallet-Level Tracking** - Track individual post performance tied to wallet addresses
- **Protocol Benchmarking** - Compare performance against protocol-wide averages
- **Gas Optimization Analytics** - Visualize optimal posting times based on gas prices
- **Multi-Format Export** - Export to IPFS, Arweave, and traditional formats (PDF, CSV)

### DAO & Governance
- **Token-Gated Workflows** - Streamline DAO content approval with token-gated workflows and NFT-based permissions
- **Onchain Approval Workflows** - Multi-step approval via smart contracts with immutable audit trails
- **DAO Voting Integration** - Governance-based content approval with token-weighted voting
- **Multi-Sig Treasury** - Manage DAO treasuries with multi-signature support
- **Governance Proposals** - Create and manage governance proposals
- **Voting Power Tracking** - Monitor voting power and delegation
- **Quorum Tracking** - Track quorum requirements for governance

### NFT & Token Features
- **NFT Content Minting** - Mint social posts as NFTs with wallet-signed metadata
- **NFT Marketplace Integration** - List and manage NFTs across marketplaces
- **NFT Drops** - Create and manage NFT drop campaigns
- **Token Rewards** - Distribute token rewards with wallet signatures
- **Token Staking** - Stake tokens with lock periods and reward tracking
- **Airdrop Manager** - Create and execute airdrops to multiple recipients
- **Token-Gated Content** - Exclusive content for token/NFT holders
- **Creator Tokens** - Mint and manage creator tokens

### Smart Contracts & Automation
- **Smart Contract Deployer** - Deploy smart contracts with wallet signatures
- **Smart Contract Webhooks** - Subscribe to blockchain events for automated workflows
- **Contract Event Listener** - Listen to contract events in real-time
- **Onchain Automation Rules** - Trigger-based smart contracts for automated publishing
- **Gas-Optimized Scheduling** - AI recommendations factoring in gas prices
- **Transaction Batcher** - Batch multiple transactions for gas optimization

### Cross-Chain & Bridge
- **Cross-Chain Distribution** - Manage content distribution across chains
- **Cross-Chain Bridge** - Bridge assets across chains with automatic chain switching
- **Multi-Chain Balance Aggregator** - Aggregate balances across multiple chains
- **Cross-Protocol Messaging** - Send messages across protocols with wallet signatures

### Engagement & Community
- **Token-Gated Engagement** - Automated engagement with NFT/token holder verification
- **Wallet Reputation Tracking** - Track engagement quality based on wallet age, holdings, and activity
- **Onchain Engagement Metrics** - Track mints, collects, mirrors, tips, and NFT-based interactions
- **Protocol-Specific Analytics** - Detailed breakdowns for Farcaster casts, Lens mirrors, and Mirror collects
- **Social Graph Analysis** - Leverage onchain social graphs for engagement insights
- **Sentiment Analysis** - Track sentiment using onchain reaction data and token signals

### Campaign & Creator Tools
- **Smart Contract Campaign Management** - Deploy campaigns as smart contracts
- **Wallet-Based Creator Tracking** - Monitor creator performance using wallet addresses
- **NFT Collaboration Campaigns** - Launch campaigns using NFTs as proof of collaboration
- **Creator Outreach** - Direct wallet-to-wallet outreach with payment automation
- **Web3 ROI Calculator** - Calculate ROI including token appreciation, NFT value, and protocol rewards

### Compliance & Security
- **DAO-Based Moderation** - Community-driven content moderation with token voting
- **Smart Contract Compliance** - Automated compliance checks via smart contracts
- **Reputation System** - Onchain reputation tracking for safety and trust
- **Wallet Verification** - Verify wallet ownership with cryptographic signatures
- **Content Attribution** - Track content creators and contributors onchain

### Developer & Integration
- **Web3 API Gateway** - Decentralized API access with wallet authentication
- **Protocol Integrations** - Native connections to Farcaster, Lens, Mirror, and more
- **Contract Reader/Writer** - Read from and write to any smart contract
- **Transaction Status Tracking** - Monitor transaction confirmations and status
- **Gas Price Monitoring** - Real-time gas price tracking for optimal transaction timing

## Tech Stack

- **Next.js** (App Router) - React framework
- **Tailwind CSS** - Styling
- **Reown AppKit** + **Wagmi** + **Viem** - Web3 wallet integration
- **TypeScript** - Type safety
- **IPFS/Arweave** - Decentralized storage

## Wallet Integration

All onchain features are powered by **Reown AppKit** and **Wagmi** for seamless wallet connectivity. Every onchain operation requires wallet connection and uses wallet hooks for:

- Authentication and wallet verification
- Transaction signing and contract interactions
- Balance checking and chain switching
- Event monitoring and data reading
- Gas estimation and transaction management

Key hooks used: `useAccount`, `useWriteContract`, `useSignMessage`, `useReadContract`, `useBalance`, `useSwitchChain`, `useFeeData`, `useWatchContractEvent`, `useDeployContract`, `useSignTypedData`, `useSendTransaction`, and more.

## Environment Setup

Set `NEXT_PUBLIC_PROJECT_ID` from your [Reown dashboard](https://dashboard.reown.com).

## Supported Protocols & Platforms

### Decentralized Protocols
- **Farcaster** - Decentralized social network
- **Lens Protocol** - Composable web3 social graph
- **Mirror** - Decentralized publishing and NFT minting

### Traditional Platforms
- **Instagram** - Photo and video sharing
- **X (Twitter)** - Microblogging

## Key Capabilities

- **🔗 Multi-Protocol Publishing** - One-click to Farcaster, Lens, Mirror + traditional platforms
- **⛓️ Blockchain-Verified Analytics** - Immutable, transparent performance tracking
- **💎 NFT Content Management** - Create and track social NFTs
- **🏛️ DAO Collaboration** - Token-gated workflows with onchain governance
- **🔐 Wallet-Based Auth** - Secure access via Web3 wallets
- **💰 Web3 Commerce** - Sell NFTs and accept crypto payments
- **📊 Cross-Chain Analytics** - Unified metrics across blockchains
- **🌐 Decentralized Storage** - IPFS/Arweave integration
- **⚡ Gas Optimization** - Smart scheduling to minimize costs
- **📈 Protocol Benchmarking** - Compare against onchain averages
- **🗳️ Community Moderation** - DAO-based governance
- **💼 Treasury Management** - Multi-sig wallet integration

## Project Structure

```
src/
  app/
    page.tsx          # Main dashboard component
  features/
    onchain/         # All onchain feature implementations
  context/           # Wallet and app context providers
  config.ts          # Reown and Wagmi configuration
```

## Why Choose 1Social?

### 🔗 True Web3 Integration
Built natively for decentralized protocols with onchain verification, not just API wrappers.

### ⚡ Gas Efficient
Smart scheduling and batching to minimize transaction costs across all operations.

### 🎯 Token-Native
Everything from access control to analytics leverages tokens and NFTs for enhanced functionality.

### 🌍 Decentralized First
Permanent storage on IPFS/Arweave with blockchain-verified analytics and attribution.

### 🛡️ DAO-Ready
Built for communities with token-gated access, multi-sig support, and onchain governance.

## Contributing

Built for the decentralized web. Contributions welcome to help make web3 social media management more accessible.

## License

MIT
