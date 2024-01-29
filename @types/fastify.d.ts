import { FastifyJwtNamespace, JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{
      jwtDecode: "securityJwtDecode";
      jwtSign: "securityJwtSign";
      jwtVerify: "securityJwtVerify";
    }> {
    authenticate: any;
  }
}
