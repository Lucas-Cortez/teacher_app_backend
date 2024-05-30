import { DecodedUserToken } from "src/modules/auth/domain/entities/decoded-user-token";

declare module "fastify" {
  interface FastifyRequest {
    user?: DecodedUserToken;
  }
}
