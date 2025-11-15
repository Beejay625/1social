# Contract Verification Troubleshooting Guide

## Error: "Unable to find matching Contract Bytecode and ABI"

This error occurs when the verification settings don't match the deployment settings. Here's how to fix it:

## Solution 1: Match Remix Compiler Settings

If you deployed via Remix, you need to match the exact compiler settings:

### Step 1: Check Your Remix Compiler Settings

In Remix, check:
- **Compiler Version**: Exact version (e.g., 0.8.20, 0.8.21, etc.)
- **Optimization**: Enabled or Disabled?
- **Runs**: If enabled, what number? (usually 200)

### Step 2: Verify on Etherscan with Matching Settings

When verifying on Etherscan:

1. **Compiler Type**: Solidity (Single file)
2. **Compiler Version**: Select the EXACT version from Remix (not just "latest 0.8.x")
3. **Open Source License Type**: MIT
4. **Optimization**: 
   - If Remix had it **enabled**: Select "Yes" and enter the same "Runs" value
   - If Remix had it **disabled**: Select "No"
5. **Constructor Arguments**: Leave empty (your constructor takes no parameters)
6. **Enter the Solidity Contract Code**: Paste your EXACT contract code

### Step 3: Common Remix Settings

Most Remix deployments use:
- **Compiler Version**: 0.8.20 or 0.8.21
- **Optimization**: Usually **DISABLED** by default
- **Runs**: N/A if disabled

Try verifying with:
- Compiler: **0.8.20** (or whatever you used)
- Optimization: **No**
- Constructor Arguments: (leave empty)

## Solution 2: Try Different Compiler Versions

If it still doesn't work, try:
1. **0.8.20** with optimization **No**
2. **0.8.21** with optimization **No**
3. **0.8.20** with optimization **Yes**, Runs: **200**
4. **0.8.21** with optimization **Yes**, Runs: **200**

## Solution 3: Use Flattened Contract (Advanced)

If single file doesn't work:

1. In Remix, go to **Solidity Compiler** tab
2. Click **"Flatten"** button (if available)
3. Copy the flattened code
4. On Etherscan, select **"Solidity (Standard JSON Input)"**
5. Upload the flattened JSON

## Solution 4: Verify via Hardhat (Recommended)

If you have the deployment transaction hash, use Hardhat:

```bash
# Make sure hardhat.config.ts matches your deployment settings
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

This automatically matches the compiler settings from your config.

## Quick Checklist

Before verifying, ensure:
- ✅ Exact compiler version matches
- ✅ Optimization setting matches (enabled/disabled)
- ✅ Runs value matches (if optimization enabled)
- ✅ Constructor arguments are correct (empty in your case)
- ✅ Contract code is exactly the same (no extra spaces/formatting)
- ✅ No extra blank lines at the end

## Still Not Working?

1. **Check the deployed bytecode**: On Etherscan, go to your contract → "Code" tab → Compare with your compiled bytecode
2. **Try Standard JSON Input**: More reliable for complex contracts
3. **Contact support**: Etherscan has a support form if verification fails

