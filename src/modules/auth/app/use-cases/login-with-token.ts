import { type IUseCase } from "src/core/abstracts/use-case";
import { inject, injectable } from "tsyringe";
import {
  type ITokenCodeRepository,
  TokenCodeRepository,
} from "../../domain/repositories/token-code.repository";
import { type IUserRepository, UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { type IJwtService, JwtService } from "../services/jwt.service";
import { TokenType } from "../../domain/enums/token-type";

export type LoginWithTokenInput = { email: string; token: string };
export type LoginWithTokenOutput = {
  accessToken: string;
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

    if (!user) throw new Error("[ERROR]: token error");

    const tokenCode = await this.tokenCodeRepository.findByToken(input.token);

    if (!tokenCode) throw new Error("[ERROR]: token error");

    await this.tokenCodeRepository.deleteById(tokenCode.tokenCodeId);

    if (tokenCode.isExpired()) throw new Error("[ERROR]: token expired");

    const tokenUser = { userId: user.userId, role: user.role, email: user.email, verified: user.verified };

    const accessToken = this.jwtService.sign(
      { ...tokenUser, type: TokenType.ACCESS_TOKEN },
      { expiresIn: "1w" },
    );

    return { accessToken, user: tokenUser };
  }
}
