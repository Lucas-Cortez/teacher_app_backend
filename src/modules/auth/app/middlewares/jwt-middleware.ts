import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { IMiddleware } from "src/core/abstracts/middleware";
import { JwtGuard } from "../guards/jwt.guard";
import { AppError } from "src/shared/errors/app-error";

export class JwtMiddleware implements IMiddleware<FastifyRequest, FastifyReply, HookHandlerDoneFunction> {
  constructor(private readonly jwtGuard: JwtGuard) {}

  use(req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction): void {
    const { accessToken } = req.cookies;

    const isAllowed = this.jwtGuard.canActivate({ token: accessToken });

    if (!isAllowed) {
      throw new AppError(AppError.formatError("not-allowed", 401, "Not allowed"));
    }

    req.user = this.jwtGuard.payload;

    next();
  }
}
