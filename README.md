# 1Social - Onchain Social Media Command Center

> **The Problem:** Traditional social media platforms lock creators into centralized ecosystems where content ownership is an illusion, analytics are opaque, and monetization is controlled by intermediaries. Web3 protocols like Farcaster, Lens, and Mirror offer true ownership and decentralization, but managing content across multiple onchain protocols requires complex wallet interactions, gas optimization, and deep technical knowledge.

---

## 💡 The Solution: 1Social

**1Social is the first truly onchain social media management platform** where every action—from content creation to analytics—is executed directly on the blockchain through smart contracts, authenticated via Reown AppKit wallet signatures, and stored immutably onchain.

### How It Works

#### 🔐 **Wallet-First Architecture**
Every user interaction begins with a Reown AppKit wallet connection. When you compose content, schedule posts, or view analytics, your wallet address serves as your identity. All operations require cryptographic signatures, ensuring that only you can execute actions on your behalf. This eliminates the need for traditional usernames, passwords, or centralized authentication systems.

#### 📝 **Onchain Content Creation**
When you create a post in 1Social, the content metadata is first signed by your wallet using `useSignMessage` from Reown AppKit. The content itself is stored on IPFS or Arweave (decentralized storage), and the IPFS hash is recorded onchain via a smart contract call. This creates an immutable record linking your wallet address to your content, timestamped on the blockchain. You can then publish this onchain-verified content to Farcaster, Lens, Mirror, or traditional platforms—all from a single interface.

#### ⛓️ **Smart Contract Execution**
Instead of API calls to centralized servers, 1Social uses `useWriteContract` to interact directly with smart contracts on Ethereum, Base, Optimism, and other EVM-compatible chains. For example:
- **Publishing to Farcaster**: Your wallet signs a message, and a smart contract records the cast onchain
- **Minting as NFT**: The NFT contract receives your transaction, minting the NFT with your wallet as the owner
- **Scheduling Posts**: A smart contract stores the scheduled timestamp and content hash, executing automatically when conditions are met

#### 📊 **Blockchain-Verified Analytics**
Analytics in 1Social aren't pulled from centralized APIs—they're read directly from onchain data using `useReadContract`. When you view engagement metrics, you're seeing:
- Real-time data from smart contract events
- Token-weighted engagement (wallet holdings determine influence)
- Cross-chain aggregation of your content performance
- Immutable historical records stored onchain

#### 💰 **Native Token & NFT Integration**
1Social doesn't just support tokens and NFTs—it's built around them. Every feature leverages onchain assets:
- **Token-Gated Content**: Access is controlled by smart contract checks of token balances
- **NFT Minting**: Posts are minted as NFTs with metadata stored on IPFS, ownership tracked onchain
- **Token Rewards**: Distribution happens via smart contract calls, not database updates
- **Staking & DeFi**: Direct integration with staking pools, liquidity pools, and governance contracts

#### 🔄 **Gas Optimization & Batching**
Managing multiple onchain protocols can be expensive. 1Social solves this through:
- **Transaction Batching**: Multiple operations combined into single transactions
- **Gas Price Monitoring**: Real-time gas tracking via `useReadContract` to optimize timing
- **Smart Scheduling**: Posts scheduled during low-gas periods
- **Multicall Execution**: Batch multiple contract calls into one transaction

#### 🏛️ **DAO & Governance Integration**
For teams and communities, 1Social provides onchain governance tools:
- **Multi-Sig Treasury**: Proposals require multiple wallet signatures via smart contracts
- **Token-Weighted Voting**: Voting power calculated from onchain token balances
- **Onchain Approval Workflows**: Each approval step recorded as a smart contract event
- **Transparent Attribution**: All contributions linked to wallet addresses onchain

#### 🌐 **Cross-Chain & Multi-Protocol**
1Social aggregates data and operations across chains:
- **Cross-Chain Balance Tracking**: Reads balances from multiple chains simultaneously
- **Protocol Abstraction**: Unified interface for Farcaster, Lens, and Mirror—each with onchain verification
- **Chain Switching**: Automatic chain detection and switching via Reown AppKit
- **Portfolio Aggregation**: View your entire onchain presence across all chains and protocols

### Technical Implementation

**No API Wrappers**: Unlike other platforms that use REST APIs to interact with web3 protocols, 1Social uses direct smart contract interactions. Every feature is implemented as a React hook that:
1. Checks wallet connection via `useAccount`
2. Signs messages via `useSignMessage` for authentication
3. Reads onchain data via `useReadContract`
4. Writes transactions via `useWriteContract`

**Immutable Storage**: Content is stored on IPFS/Arweave with hashes recorded onchain. Analytics are stored as smart contract events. Nothing is stored in centralized databases.

**Real-Time Updates**: Using The Graph for indexing and direct contract event listening, 1Social provides real-time updates without polling centralized APIs.

**Gas Efficiency**: Features like batch operations, multicall execution, and gas-optimized scheduling ensure that onchain operations are cost-effective.

### The Result

With 1Social, creators get:
- ✅ **True Ownership**: Your content is yours, verifiable onchain
- ✅ **Transparent Analytics**: All metrics are blockchain-verified and immutable
- ✅ **Direct Monetization**: No intermediaries—earn directly through tokens, NFTs, and tips
- ✅ **Multi-Protocol Reach**: Publish everywhere while maintaining onchain ownership
- ✅ **DAO-Ready**: Built-in governance and collaboration tools
- ✅ **Future-Proof**: Your content and data exist independently of any platform

**No API wrappers. No centralized dependencies. No compromises. Compose once, publish everywhere, own everything—all verified and executed onchain.**

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
