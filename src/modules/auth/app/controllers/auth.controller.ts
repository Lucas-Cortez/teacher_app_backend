import { inject, injectable } from "tsyringe";
// import { LoginWithTokenUseCase } from "../use-cases/login-with-token";
import { SendLoginTokenUseCase } from "../use-cases/send-login-token";
import { LoginWithTokenUseCase } from "../use-cases/login-with-token";
import { LoginWithTokenDto } from "../dtos/login-with-token.dto";
import { SendLoginTokenDto } from "../dtos/send-login-token.dto";
import { FastifyReply, FastifyRequest } from "fastify";

@injectable()
export class AuthController {
  constructor(
    @inject(SendLoginTokenUseCase)
    private readonly sendLoginTokenUseCase: SendLoginTokenUseCase,
    @inject(LoginWithTokenUseCase)
    private readonly loginWithTokenUseCase: LoginWithTokenUseCase,
  ) {}

  async sendLoginToken(request: FastifyRequest, _: FastifyReply) {
    const dto = SendLoginTokenDto.validate(request.body);

    return this.sendLoginTokenUseCase.execute(dto);
  }

  async loginWithToken(request: FastifyRequest, response: FastifyReply) {
    const dto = LoginWithTokenDto.validate(request.body);

    const data = await this.loginWithTokenUseCase.execute(dto);

    response.setCookie("accessToken", data.accessToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days,
    });

    return data;
  }
}
