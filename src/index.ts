import app from "./app";
import envConfig from "./config/env.config";

const startApp = () => {
  try {
    const server = app.listen(envConfig.PORT);
    // max time for an request
    server.timeout = envConfig.Server_Request_Timeout;

    console.log("Server Started on http://localhost:" + envConfig.PORT);
  } catch (error) {
    console.error("Application Error", error);
  }
};

startApp();
