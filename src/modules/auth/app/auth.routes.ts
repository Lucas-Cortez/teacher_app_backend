import { FastifyInstance } from "fastify";
import { appContainer } from "src/shared/container/app-container";
import { AuthController } from "./controllers/auth.controller";

export const authRoutes = async (instance: FastifyInstance) => {
  const authController = appContainer.resolve(AuthController);

  instance.post("/send-login-token", async (request, reply) => {
    return { hello: "world" };
  });

  instance.post("/login-with-token", async (request, reply) => {
    return { hello: "world" };
  });
};
