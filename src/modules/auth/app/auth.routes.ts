import { FastifyInstance } from "fastify";
// import { appContainer } from "src/shared/container/app-container";
// import { AuthController } from "./controllers/auth.controller";
// import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

export const authRoutes = async (instance: FastifyInstance) => {
  // const authController = appContainer.resolve(AuthController);

  instance.post(
    "/send-login-token/:id",
    {
      // schema: {
      //   body: testeSchema.definitions?.teste,
      // },
    },
    async (request, reply) => {
      return { hello: "world" };
    },
  );

  instance.post("/login-with-token", async (request, reply) => {
    return { hello: "world" };
  });
};

// const opa = z.object({
//   hello: z.string(),
//   foo: z.number(),
//   bar: z.boolean(),
// });

// const testeSchema = zodToJsonSchema(opa, "teste");
