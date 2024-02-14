import { FastifyInstance } from "fastify";
import { authRoutes } from "src/modules/auth/app/auth.routes";

export const routes = async (instance: FastifyInstance) => {
  instance.register(authRoutes, { prefix: "/auth" });
  // instance.get(
  //   "/hello",
  //   {
  //     onRequest: [instance.authenticate],
  //     // preHandler: [instance.authenticate],
  //   },
  //   async (request, reply) => {
  //     console.log(request.user);

  //     return { hello: "world" };
  //   },
  // );
};
