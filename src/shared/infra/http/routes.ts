import { FastifyInstance } from "fastify";
import lodash from "lodash";
import { Homework } from "src/modules/homework/domain/entities/homework";

// import { authRoutes } from "src/modules/auth/app/auth.routes";
// import { JwtGuard } from "src/modules/auth/app/guards/jwt.guard";
// import { JwtMiddleware } from "src/modules/auth/app/middlewares/jwt-middleware";
// import { WebJwtService } from "src/modules/auth/infra/services/web-jwt.service";

export const routes = async (instance: FastifyInstance) => {
  // instance.register(authRoutes, { prefix: "/auth" });

  // const jwtService = new WebJwtService();

  // const jwtMiddleware = new JwtMiddleware(new JwtGuard(jwtService));

  // const opa = jwtService.sign({ name: "Lucas" }, { expiresIn: "1w" });

  // console.log(opa);

  // Configure tags in swagger
  instance.addHook("onRoute", (routeOptions) => {
    if (routeOptions.prefix) {
      const tag = routeOptions.prefix.replace("/", "");

      routeOptions.schema = {
        ...routeOptions.schema,
        tags: [lodash.capitalize(tag), ...(routeOptions.schema?.tags || [])],
      };
    }
  });

  instance.get(
    "/hello",
    {
      // onRequest: jwtMiddleware.use.bind(jwtMiddleware),
      schema: {
        security: [{ CookieAuth: [] }],
      },
    },

    async (request, reply) => {
      console.log(request.user);

      // reply.setCookie("accessToken", opa, { domain: "localhost", path: "/", maxAge: 60 });

      return { hello: "world" };
    },
  );
};
