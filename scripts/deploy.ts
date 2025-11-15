import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SocialMediaContract...");

  const SocialMediaContract = await ethers.getContractFactory("SocialMediaContract");
  const contract = await SocialMediaContract.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("SocialMediaContract deployed to:", address);
  console.log("Wait for block confirmations before verifying...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

