import { minutesSeconds } from "../helper/date-time.helper";

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: minutesSeconds(5),
  Server_Request_Timeout: 30 * 1000
} as const;
