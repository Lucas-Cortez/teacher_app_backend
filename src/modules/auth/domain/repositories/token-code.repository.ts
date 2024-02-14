import { TokenCode } from "../entities/token-code";

export const TokenCodeRepository = Symbol.for("TokenCodeRepository");

export interface ITokenCodeRepository {
  create(data: TokenCode): Promise<TokenCode>;
  findByUserId(userId: string): Promise<TokenCode | null>;
  findByToken(token: string): Promise<TokenCode | null>;
  deleteById(tokenCodeId: string): Promise<void>;
}
