import { DecodedUserToken } from "src/modules/auth/domain/entities/decoded-user-token";

declare module "fastify" {
  // interface FastifyInstance
  //   extends FastifyJwtNamespace<{
  //     jwtDecode: "securityJwtDecode";
  //     jwtSign: "securityJwtSign";
  //     jwtVerify: "securityJwtVerify";
  //   }> {
  //   authenticate: any;
  //   user?: DecodedUserToken;
  // }

  interface FastifyRequest {
    user?: DecodedUserToken;
  }
}
