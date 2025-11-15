# Contract Deployment Guide

## Quick Start: Deploy via Remix (Easiest)

1. **Go to Remix**: https://remix.ethereum.org
2. **Create file**: `SocialMediaContract.sol`
3. **Paste contract code** from `contracts/SocialMediaContract.sol`
4. **Compile**: Select compiler version 0.8.20+
5. **Deploy**:
   - Environment: "Injected Provider - MetaMask"
   - Connect wallet
   - Select network (Sepolia testnet recommended for testing)
   - Click "Deploy"
6. **Verify on Etherscan**:
   - Go to https://sepolia.etherscan.io (or mainnet)
   - Search your contract address
   - Click "Contract" → "Verify and Publish"
   - Select: Solidity (Single file), v0.8.20+, MIT License
   - Paste contract code and verify

## Professional Setup: Deploy via Hardhat

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
SEPOLIA_RPC_URL=https://rpc.sepolia.org
MAINNET_RPC_URL=https://eth.llamarpc.com
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Deployment Steps

1. **Compile the contract**:
```bash
npm run compile
```

2. **Deploy to Sepolia testnet**:
```bash
npm run deploy:sepolia
```

3. **Deploy to Mainnet** (when ready):
```bash
npm run deploy:mainnet
```

4. **Verify contract** (after deployment):
   - Update `.env` with `CONTRACT_ADDRESS`
   - Run: `npm run verify`

### Getting API Keys

- **Etherscan API Key**: 
  - Go to https://etherscan.io/apis
  - Create account and get free API key

- **RPC URLs**: 
  - Free: https://rpc.sepolia.org (Sepolia)
  - Or use Alchemy/Infura for better reliability

### Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env` file to git
- Never share your private key
- Test on Sepolia testnet first
- Verify contract source code on Etherscan for transparency

### Contract Address

After deployment, save your contract address. You'll need it to:
- Interact with the contract
- Update your frontend configuration
- Share with users

