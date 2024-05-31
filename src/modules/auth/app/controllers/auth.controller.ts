import { inject, injectable } from "tsyringe";
import { SendLoginTokenUseCase } from "../use-cases/send-login-token";
import { LoginWithTokenUseCase } from "../use-cases/login-with-token";
import { LoginWithTokenDto } from "../dtos/login-with-token.dto";
import { SendLoginTokenDto } from "../dtos/send-login-token.dto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IController } from "src/core/abstracts/controller";

@injectable()
export class AuthController implements IController {
  constructor(
    @inject(SendLoginTokenUseCase)
    private readonly sendLoginTokenUseCase: SendLoginTokenUseCase,
    @inject(LoginWithTokenUseCase)
    private readonly loginWithTokenUseCase: LoginWithTokenUseCase,
  ) {}

  async register(registerInstance: FastifyInstance) {
    registerInstance.register(
      async (instance) => {
        instance.post(
          "/",
          {
            schema: { body: SendLoginTokenDto.json },
          },
          (request, reply) => this.sendLoginToken(request, reply),
        );
        instance.post(
          "/login",
          {
            schema: { body: LoginWithTokenDto.json },
          },
          (request, reply) => this.loginWithToken(request, reply),
        );
      },
      { prefix: "/auth" },
    );
  }

  private async sendLoginToken(request: FastifyRequest, _: FastifyReply) {
    const dto = SendLoginTokenDto.validate(request.body);

    return this.sendLoginTokenUseCase.execute(dto);
  }

  private async loginWithToken(request: FastifyRequest, response: FastifyReply) {
    const dto = LoginWithTokenDto.validate(request.body);

    const data = await this.loginWithTokenUseCase.execute(dto);

    response.setCookie("accessToken", data.accessToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days,
      secure: false,
      // httpOnly: true,
    });

    return data;
  }
}
