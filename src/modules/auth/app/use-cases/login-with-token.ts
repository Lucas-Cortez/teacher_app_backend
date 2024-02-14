import { IUseCase } from "src/core/abstracts/use-case";
import { inject, injectable } from "tsyringe";
import { ITokenCodeRepository, TokenCodeRepository } from "../../domain/repositories/token-code.repository";
import { IUserRepository, UserRepository } from "src/modules/user/domain/repositories/user-repository";
import { IJwtService, JwtService } from "../services/jwt.service";
import { TokenType } from "../../domain/enums/token-type";

export type LoginWithTokenInput = { email: string; token: string };
export type LoginWithTokenOutput = {
  accessToken: string;
  refreshToken: string;
  user: { userId: string; email: string; role: string; verified: boolean };
};

@injectable()
export class LoginWithTokenUseCase implements IUseCase<LoginWithTokenInput, LoginWithTokenOutput> {
  constructor(
    @inject(TokenCodeRepository)
    private readonly tokenCodeRepository: ITokenCodeRepository,
    @inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(JwtService)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(input: LoginWithTokenInput): Promise<LoginWithTokenOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) throw new Error("error");

    const tokenCode = await this.tokenCodeRepository.findByToken(input.token);

    if (!tokenCode) throw new Error("error");

    await this.tokenCodeRepository.deleteById(tokenCode.tokenCodeId);

    if (tokenCode.expiredAt.getTime() < Date.now()) throw new Error("error");

    const tokenUser = { userId: user.userId, role: user.role, email: user.email, verified: user.verified };

    const accessToken = this.jwtService.sign(
      { ...tokenUser, type: TokenType.ACCESS_TOKEN },
      { expiresIn: "1h" },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.userId, type: TokenType.REFRESH_TOKEN },
      { expiresIn: "30d" },
    );

    return { accessToken, refreshToken, user: tokenUser };
  }
}
