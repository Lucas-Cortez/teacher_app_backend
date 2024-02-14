import { inject, injectable, singleton } from "tsyringe";
// import { LoginWithTokenUseCase } from "../use-cases/login-with-token";
import { SendLoginTokenUseCase } from "../use-cases/send-login-token";
import { LoginWithTokenUseCase } from "../use-cases/login-with-token";

@injectable()
export class AuthController {
  constructor(
    @inject(SendLoginTokenUseCase)
    private readonly sendLoginTokenUseCase: SendLoginTokenUseCase,
    @inject(LoginWithTokenUseCase)
    private readonly loginWithTokenUseCase: LoginWithTokenUseCase,
  ) {}

  async sendLoginToken(payload: any) {
    const { email } = payload;
    await this.sendLoginTokenUseCase.execute({ email });
    return;
  }

  async loginWithToken(payload: any) {
    const { email, token } = payload;
    const data = await this.loginWithTokenUseCase.execute({ email, token });
    return data;
  }
}
