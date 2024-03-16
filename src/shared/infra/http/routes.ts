import { FastifyInstance } from "fastify";
import { authRoutes } from "src/modules/auth/app/auth.routes";
import { JwtGuard } from "src/modules/auth/app/guards/jwt.guard";
import { JwtMiddleware } from "src/modules/auth/app/middlewares/jwt-middleware";
import { WebJwtService } from "src/modules/auth/infra/services/web-jwt.service";

export const routes = async (instance: FastifyInstance) => {
  instance.register(authRoutes, { prefix: "/auth" });

  const jwt = new JwtMiddleware(new JwtGuard(new WebJwtService()));

  instance.get(
    "/hello",
    {
      onRequest: jwt.use.bind(jwt),
      // preHandler: [instance.authenticate],
    },

    async (request, reply) => {
      // console.log(request.user);

      return { hello: "world" };
    },
  );
};
