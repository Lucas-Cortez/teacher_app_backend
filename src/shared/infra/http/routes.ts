import { FastifyInstance } from "fastify";
import lodash from "lodash";

import { AuthController } from "src/modules/auth/app/controllers/auth.controller";
import { appContainer } from "src/shared/container/app-container";

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
