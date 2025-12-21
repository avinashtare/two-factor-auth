import app from "./app";
import connectDb from "./config/db.config";
import envConfig from "./config/env.config";

const startApp = async () => {
  try {
    const dbName = await connectDb();
    console.info(`Database connected`, dbName);

    const server = app.listen(envConfig.PORT);
    // max time for an request
    server.timeout = envConfig.Server_Request_Timeout;

    console.log("Server Started on http://localhost:" + envConfig.PORT);
  } catch (error) {
    console.error("Application Error", error);
  }
};

void startApp();
