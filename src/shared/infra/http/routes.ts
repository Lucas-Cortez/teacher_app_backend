import { FastifyInstance, RegisterOptions, RouteShorthandOptions } from "fastify";

export const routes = async (instance: FastifyInstance) => {
  instance.get("/hello", async (request, reply) => {
    return { hello: "it worked!" };
  });

  instance.get(
    "/opa",
    {
      // onRequest: []
      preHandler: [instance.authenticate],
    },
    async (request, reply) => {
      console.log(request.user);

      return { hello: "it worked!" };
    },
  );
};
