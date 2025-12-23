import { minutesSeconds } from "../helper/date-time.helper";

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  Server_Request_Timeout: minutesSeconds(30),
} as const;
