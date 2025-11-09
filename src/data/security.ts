export const securityLogs = [
  {
    id: "log-1",
    type: "login",
    user: "admin@example.com",
    ip: "192.168.1.100",
    location: "San Francisco, CA",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "success",
  },
  {
    id: "log-2",
    type: "api_key_created",
    user: "dev@example.com",
    ip: "10.0.0.5",
    location: "New York, NY",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "success",
  },
  {
    id: "log-3",
    type: "failed_login",
    user: "unknown@example.com",
    ip: "203.0.113.42",
    location: "Unknown",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "failed",
  },
];

export const activeSessions = [
  {
    id: "session-1",
    device: "MacBook Pro",
    browser: "Chrome 120",
    ip: "192.168.1.100",
    location: "San Francisco, CA",
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    current: true,
  },
  {
    id: "session-2",
    device: "iPhone 15",
    browser: "Safari 17",
    ip: "10.0.0.5",
    location: "New York, NY",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    current: false,
  },
];

export const securitySettings = {
  twoFactorEnabled: true,
  passwordExpiry: 90,
  sessionTimeout: 30,
  ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
  requireMfa: true,
};

