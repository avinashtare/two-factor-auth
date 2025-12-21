export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  Server_Request_Timeout: 30 * 1000
} as const;
