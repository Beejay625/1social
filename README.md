# 1Social - Onchain Social Media Command Center

> **The first truly onchain social media management platform** - Compose once, publish everywhere. Built with Next.js and powered by Reown AppKit for seamless wallet integration.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Reown AppKit](https://img.shields.io/badge/Reown-AppKit-3396FF)](https://reown.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the application.

> **⚠️ Important:** Get your Reown Project ID from [reown.com](https://reown.com/) - wallet connection requires a valid Project ID.

---

## ✨ What Makes 1Social Different?

### 🔗 **100% Onchain-Native**
Every feature operates directly on the blockchain. No API wrappers, no centralized dependencies. All interactions are authenticated and verified through **Reown AppKit**.

### ⛓️ **Blockchain-Verified Everything**
- Immutable analytics stored onchain
- Cryptographic content verification
- Transparent, tamper-proof records
- Wallet-based authentication

### 💎 **Token & NFT-First**
- Token-gated access control
- NFT content minting and management
- Token-weighted engagement tracking
- Full DeFi integration

### 🌐 **Multi-Protocol Publishing**
Publish to **Farcaster**, **Lens Protocol**, **Mirror**, and traditional platforms (Instagram, X) with a single click.

---

## 🎯 Core Onchain Features

### 📝 **Content Publishing & Management**
- **Multi-Protocol Publishing** - One-click publishing across decentralized protocols
- **Blockchain-Timestamped Scheduling** - Schedule posts with onchain verification
- **NFT Content Minting** - Mint social posts as NFTs with wallet-signed metadata
- **IPFS/Arweave Storage** - Permanent decentralized storage with cryptographic verification
- **Content Verification** - Cryptographically verify content authenticity
- **Immutable Version History** - All content versions stored onchain

### 📊 **Onchain Analytics & Insights**
- **Blockchain-Verified Analytics** - Real-time performance tracking with onchain data
- **Cross-Chain Analytics** - Unified metrics across multiple blockchain networks
- **Token-Weighted Engagement** - Prioritize high-value wallet interactions
- **Protocol Benchmarking** - Compare against onchain averages
- **Wallet-Level Tracking** - Track individual post performance tied to wallet addresses
- **Immutable Performance Records** - All metrics stored onchain

### 🏛️ **DAO & Governance**
- **Token-Gated Collaboration** - NFT-based access control for team features
- **Onchain Approval Workflows** - Multi-step approval via smart contracts
- **DAO Voting Integration** - Governance-based content approval with token-weighted voting
- **Multi-Sig Treasury** - Create treasury proposals requiring multiple signatures
- **Governance Proposals** - Create and manage DAO governance proposals
- **Onchain Voting** - Cast votes with token-weighted voting power

### 💰 **Token & DeFi Operations**
- **Token Staking** - Stake tokens with lock periods and reward tracking
- **Liquidity Pool Management** - Create, track, and manage LP positions
- **Token Rewards Distribution** - Batch distribute tokens to multiple recipients
- **Airdrop Management** - Create and execute airdrops to multiple recipients
- **DeFi Yield Tracking** - Track yield positions and APY across protocols
- **Token Vesting** - Create and manage vesting schedules

### 🖼️ **NFT Operations & Marketplace**
- **NFT Marketplace Integration** - List and manage NFTs across marketplaces
- **NFT Auctions** - Create auctions and place bids
- **NFT Rentals** - List and rent NFTs with duration-based pricing
- **NFT Drops** - Create and execute NFT drop campaigns
- **NFT Collection Management** - Manage collections, supply, royalties, and metadata
- **NFT Batch Operations** - Optimize batch mints, transfers, and listings

### 🔄 **Cross-Chain & Multi-Chain**
- **Cross-Chain Bridge** - Bridge assets across chains with automatic switching
- **Multi-Chain Portfolio Tracker** - Track portfolio value across blockchain networks
- **Cross-Protocol Messaging** - Send messages across Farcaster, Lens, and Mirror
- **Cross-Chain Token Balance Aggregator** - Aggregate balances across chains

### 🤖 **Smart Contract Automation**
- **Smart Contract Deployer** - Deploy custom smart contracts directly from wallet
- **Smart Contract Webhooks** - Subscribe to blockchain events in real-time
- **Smart Contract Rules** - Create automation rules with trigger-based actions
- **Transaction Batcher** - Batch multiple transactions for gas optimization
- **Gas-Optimized Scheduling** - AI recommendations factoring in gas prices

### 📡 **Monitoring & Tracking**
- **Smart Contract Event Monitor** - Monitor contract events in real-time
- **Wallet Activity Monitor** - Track transfers, swaps, and mints
- **Governance Proposal Monitor** - Monitor DAO proposals and voting status
- **Gas Price Monitor** - Real-time gas price tracking for optimal timing
- **Contract Interaction Logger** - Log and track all contract interactions

---

## 🔧 Advanced Onchain Features

### Token Management
- Token approval/revocation management
- Token burn scheduling and tracking
- Token lock/unlock with time-based restrictions
- Token vesting schedule creation and management
- Token governance delegation and voting
- Token liquidity pool creation and management
- Token staking pool creation and reward distribution
- Token swap aggregation and routing
- Token reflection tracking
- Token dividend distribution

### NFT Management
- NFT batch minting and optimization
- NFT metadata management and validation
- NFT collection supply management
- NFT whitelist management
- NFT royalty distribution
- NFT auction management and bidding
- NFT marketplace listing optimization
- NFT rental marketplace
- NFT collection reveal scheduling
- NFT ownership verification and history tracking

### Contract Operations
- Contract deployment and verification
- Contract upgrade management
- Contract event filtering and monitoring
- Contract ABI validation
- Contract gas estimation
- Contract state snapshots
- Contract security auditing
- Contract proxy detection and management
- Contract timelock creation
- Contract multisig approval

### Analytics & Optimization
- Gas price optimization
- Transaction batching for efficiency
- Price impact calculations
- Slippage calculations
- Portfolio value tracking
- Yield optimization
- Liquidity pool fee collection
- Staking reward compounding
- Governance quorum tracking

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Wallet** | Reown AppKit + Wagmi + Viem |
| **Storage** | IPFS / Arweave |
| **Indexing** | The Graph |

### Wallet Integration

**Reown AppKit** is the primary wallet solution, providing:
- Seamless wallet connection and management
- Transaction signing via `useSignMessage`
- Contract interactions via `useWriteContract`
- Account management via `useAccount`
- Multi-chain support

All onchain features use these hooks for authentication and transaction signing.

---

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
```

**Get your Project ID:**
1. Visit [reown.com](https://reown.com/)
2. Sign up for free
3. Create a new project
4. Copy your Project ID

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🌐 Supported Protocols

### Decentralized Protocols
- **Farcaster** - Decentralized social network with frames support
- **Lens Protocol** - Composable web3 social graph
- **Mirror** - Decentralized publishing and NFT minting

### Traditional Platforms
- **Instagram** - Photo and video sharing
- **X (Twitter)** - Microblogging and social networking

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   └── contract/         # Contract interaction components
├── features/              # Feature implementations
│   └── onchain/         # All onchain features (60+ features)
├── hooks/                # Custom React hooks
│   ├── use-reown-wallet.ts
│   ├── use-contract-read.ts
│   └── use-contract-write.ts
├── config/               # Configuration files
├── constants/           # Constants and enums
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

---

## 🔐 Security & Best Practices

- **Wallet-Based Authentication** - All operations require wallet connection via Reown AppKit
- **Cryptographic Signatures** - Content verification through wallet signatures
- **Smart Contract Verification** - Deploy and verify contracts onchain
- **DAO-Based Moderation** - Community-driven content moderation
- **Onchain Reputation System** - Transparent reputation tracking
- **Multi-Sig Support** - Secure treasury management

---

## 🚀 Why Choose 1Social?

### ✅ **True Web3 Integration**
Built natively for decentralized protocols with onchain verification. Every interaction is authenticated via Reown wallet.

### ✅ **Gas Efficient**
Smart scheduling and batching minimize transaction costs. Dynamic gas optimization based on network conditions.

### ✅ **Token-Native**
Everything from access control to analytics leverages tokens and NFTs. Full token ecosystem support.

### ✅ **Decentralized First**
Permanent storage on IPFS/Arweave with blockchain-verified analytics. No centralized dependencies.

### ✅ **DAO-Ready**
Built for communities with token-gated access, multi-sig support, and onchain governance.

---

## 📊 Feature Count

- **60+ Onchain Features** - All powered by Reown AppKit
- **Token Operations** - 30+ features
- **NFT Operations** - 25+ features
- **Smart Contract Tools** - 15+ features
- **Cross-Chain Features** - 10+ features
- **Analytics & Monitoring** - 20+ features

---

## 🤝 Contributing

We welcome contributions! Please ensure:
- All features use Reown wallet integration
- Follow TypeScript best practices
- Include proper error handling
- Add wallet connection checks

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Reown AppKit**: [reown.com](https://reown.com/)
- **Next.js**: [nextjs.org](https://nextjs.org/)
- **Wagmi**: [wagmi.sh](https://wagmi.sh/)
- **Viem**: [viem.sh](https://viem.sh/)

---

**Built for the decentralized web. Every interaction is onchain. Every feature is authenticated. Welcome to the future of social media.**
