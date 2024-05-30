import { container as appContainer } from "tsyringe";

import { AuthController } from "src/modules/auth/app/controllers/auth.controller";
import { LoginWithTokenUseCase } from "src/modules/auth/app/use-cases/login-with-token";
import { SendLoginTokenUseCase } from "src/modules/auth/app/use-cases/send-login-token";
import { JwtService } from "src/modules/auth/app/services/jwt.service";
import { MailService } from "../services/mail.service";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { TokenCodeRepository } from "src/modules/auth/domain/repositories/token-code.repository";
import { DrizzleTokenCodeRepository } from "src/modules/auth/infra/repositories/drizzle-token-code.repository";
import { DrizzleUserRepository } from "src/modules/user/infra/repositories/drizzle-user-repository";
import { WebJwtService } from "src/modules/auth/infra/services/web-jwt.service";
import { ResendMailService } from "../infra/services/resend-mail.service";

appContainer.registerSingleton(MailService, ResendMailService);
appContainer.registerSingleton(JwtService, WebJwtService);
appContainer.registerSingleton(UserRepository, DrizzleUserRepository);
appContainer.registerSingleton(TokenCodeRepository, DrizzleTokenCodeRepository);

appContainer.registerSingleton(SendLoginTokenUseCase);
appContainer.registerSingleton(LoginWithTokenUseCase);
appContainer.registerSingleton(AuthController);

export { appContainer };
