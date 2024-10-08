import { inject, injectable } from "tsyringe";
import { type IUseCase } from "src/core/abstracts/use-case";
import { type IMailService, MailService } from "src/modules/mail/domain/services/mail.service";
import {
  type ITokenCodeRepository,
  TokenCodeRepository,
} from "../../domain/repositories/token-code.repository";
import { generateToken } from "src/modules/auth/app/utils/generate-token";
import { TokenCode } from "../../domain/entities/token-code";
import { env } from "src/shared/utils/env";
import { type IUserRepository, UserRepository } from "src/modules/user/domain/repositories/user.repository";

export type SendLoginTokenInput = { email: string };
export type SendLoginTokenOutput = void;

@injectable()
export class SendLoginTokenUseCase implements IUseCase<SendLoginTokenInput, SendLoginTokenOutput> {
  constructor(
    @inject(MailService)
    private readonly mailService: IMailService,
    @inject(TokenCodeRepository)
    private readonly tokenCodeRepository: ITokenCodeRepository,
    @inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: SendLoginTokenInput): Promise<SendLoginTokenOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) throw new Error("user not found");

    const existingTokenCode = await this.tokenCodeRepository.findByUserId(user.userId);

    if (existingTokenCode) {
      await this.tokenCodeRepository.deleteById(existingTokenCode.tokenCodeId);
    }

    const token = generateToken();

    const tokenCodeEntity = TokenCode.create({
      token,
      expiredAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
      userId: user.userId,
    });

    const tokenCode = await this.tokenCodeRepository.create(tokenCodeEntity);

    await this.mailService.send({
      to: [user.email],
      from: env.MAIL_FROM,
      subject: "Your login code",
      body: `Your login code is ${tokenCode.token}`,
    });
  }
}
