import { TokenCode } from "../entities/token-code";

export const TokenCodeRepository = Symbol.for("TokenCodeRepository");

export interface ITokenCodeRepository {
  create(data: TokenCode): Promise<TokenCode>;
  findByUserId(userId: string): Promise<null | TokenCode>;
  findByToken(token: string): Promise<null | TokenCode>;
  deleteById(tokenCodeId: string): Promise<void>;
}
