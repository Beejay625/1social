// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SocialMediaContract
 * @dev A comprehensive smart contract for onchain social media features
 * All interactions require wallet signatures via Reown wallet
 */
contract SocialMediaContract {
    address public owner;
    uint256 public postCount;
    uint256 public commentCount;
    uint256 public reactionCount;
    
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        uint256 comments;
    }
    
    struct Comment {
        uint256 id;
        uint256 postId;
        address author;
        string content;
        uint256 timestamp;
    }
    
    struct Reaction {
        uint256 id;
        uint256 postId;
        address user;
        string reactionType;
        uint256 timestamp;
    }
    
    struct Profile {
        address user;
        string name;
        string bio;
        string avatar;
        uint256 reputation;
        bool verified;
    }
    
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => Reaction) public reactions;
    mapping(address => Profile) public profiles;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    mapping(address => uint256[]) public userPosts;
    
    event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author, string content);
    event ReactionAdded(uint256 indexed reactionId, uint256 indexed postId, address indexed user, string reactionType);
    event ProfileUpdated(address indexed user, string name, string bio);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        postCount = 0;
        commentCount = 0;
        reactionCount = 0;
    }
    
    function createPost(string memory content) public returns (uint256) {
        require(bytes(content).length > 0, "Content cannot be empty");
        
        postCount++;
        posts[postCount] = Post({
            id: postCount,
            author: msg.sender,
            content: content,
            timestamp: block.timestamp,
            likes: 0,
            comments: 0
        });
        
        userPosts[msg.sender].push(postCount);
        
        emit PostCreated(postCount, msg.sender, content, block.timestamp);
        return postCount;
    }
    
    function addComment(uint256 postId, string memory content) public returns (uint256) {
        require(posts[postId].id != 0, "Post does not exist");
        require(bytes(content).length > 0, "Content cannot be empty");
        
        commentCount++;
        comments[commentCount] = Comment({
            id: commentCount,
            postId: postId,
            author: msg.sender,
            content: content,
            timestamp: block.timestamp
        });
        
        posts[postId].comments++;
        
        emit CommentAdded(commentCount, postId, msg.sender, content);
        return commentCount;
    }
    
    function addReaction(uint256 postId, string memory reactionType) public returns (uint256) {
        require(posts[postId].id != 0, "Post does not exist");
        
        reactionCount++;
        reactions[reactionCount] = Reaction({
            id: reactionCount,
            postId: postId,
            user: msg.sender,
            reactionType: reactionType,
            timestamp: block.timestamp
        });
        
        if (keccak256(bytes(reactionType)) == keccak256(bytes("like")) && !hasLiked[postId][msg.sender]) {
            posts[postId].likes++;
            hasLiked[postId][msg.sender] = true;
        }
        
        emit ReactionAdded(reactionCount, postId, msg.sender, reactionType);
        return reactionCount;
    }
    
    function updateProfile(string memory name, string memory bio, string memory avatar) public {
        profiles[msg.sender] = Profile({
            user: msg.sender,
            name: name,
            bio: bio,
            avatar: avatar,
            reputation: profiles[msg.sender].reputation,
            verified: profiles[msg.sender].verified
        });
        
        emit ProfileUpdated(msg.sender, name, bio);
    }
    
    function updateReputation(address user, uint256 reputation) public onlyOwner {
        require(profiles[user].user != address(0), "Profile does not exist");
        profiles[user].reputation = reputation;
        emit ReputationUpdated(user, reputation);
    }
    
    function verifyUser(address user) public onlyOwner {
        profiles[user].verified = true;
    }
    
    function getPost(uint256 postId) public view returns (Post memory) {
        return posts[postId];
    }
    
    function getComment(uint256 commentId) public view returns (Comment memory) {
        return comments[commentId];
    }
    
    function getReaction(uint256 reactionId) public view returns (Reaction memory) {
        return reactions[reactionId];
    }
    
    function getProfile(address user) public view returns (Profile memory) {
        return profiles[user];
    }
    
    function getUserPosts(address user) public view returns (uint256[] memory) {
        return userPosts[user];
    }
    
    function getTotalPosts() public view returns (uint256) {
        return postCount;
    }
    
    function getTotalComments() public view returns (uint256) {
        return commentCount;
    }
    
    function getTotalReactions() public view returns (uint256) {
        return reactionCount;
    }
}

