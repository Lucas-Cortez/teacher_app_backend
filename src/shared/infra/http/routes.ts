import { FastifyInstance } from "fastify";
import lodash from "lodash";

import { AuthController } from "src/modules/auth/app/controllers/auth.controller";
import { appContainer } from "src/shared/container/app-container";
// import { authRoutes } from "src/modules/auth/app/auth.routes";
// import { JwtGuard } from "src/modules/auth/app/guards/jwt.guard";
// import { JwtMiddleware } from "src/modules/auth/app/middlewares/jwt-middleware";
// import { WebJwtService } from "src/modules/auth/infra/services/web-jwt.service";

export const routes = async (instance: FastifyInstance) => {
  instance.addHook("onRoute", (routeOptions) => {
    if (routeOptions.prefix) {
      const tag = routeOptions.prefix.replace("/", "");

      routeOptions.schema = {
        ...routeOptions.schema,
        tags: [lodash.capitalize(tag), ...(routeOptions.schema?.tags || [])],
      };
    }
  });

  const authController = appContainer.resolve(AuthController);

  authController.register(instance);

  // Configure tags in swagger

  // instance.get(
  //   "/hello",
  //   {
  //     // onRequest: jwtMiddleware.use.bind(jwtMiddleware),
  //     schema: {
  //       security: [{ CookieAuth: [] }],
  //     },
  //   },

  //   async (request, reply) => {
  //     console.log(request.user);

  //     // reply.setCookie("accessToken", opa, { domain: "localhost", path: "/", maxAge: 60 });

  //     return { hello: "world" };
  //   },
  // );
};
