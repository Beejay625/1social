export const TOKEN_STANDARDS = {
  ERC20: 'ERC20',
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
} as const;

export type TokenStandard = typeof TOKEN_STANDARDS[keyof typeof TOKEN_STANDARDS];

export const TOKEN_STANDARD_ABIS: Record<TokenStandard, string[]> = {
  ERC20: ['function balanceOf(address) view returns (uint256)'],
  ERC721: ['function balanceOf(address) view returns (uint256)'],
  ERC1155: ['function balanceOf(address, uint256) view returns (uint256)'],
};

