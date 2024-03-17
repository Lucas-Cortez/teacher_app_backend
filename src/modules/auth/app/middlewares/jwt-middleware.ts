import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { IMiddleware } from "src/core/abstracts/middleware";
import { JwtGuard } from "../guards/jwt.guard";
import { ErrorFactory } from "src/shared/errors/factories/error-factory";

export class JwtMiddleware implements IMiddleware<FastifyRequest, FastifyReply, HookHandlerDoneFunction> {
  constructor(private readonly jwtGuard: JwtGuard) {}

  use(req: FastifyRequest, _: FastifyReply, next: HookHandlerDoneFunction): void {
    const { accessToken } = req.cookies;

    const isAllowed = this.jwtGuard.canActivate({ token: accessToken });

    if (!isAllowed) throw ErrorFactory.unauthorized("Not Allowed");

    req.user = this.jwtGuard.payload;

    next();
  }
}
