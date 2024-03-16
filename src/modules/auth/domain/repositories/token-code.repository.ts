import { TokenCode } from "../entities/token-code";

export const TokenCodeRepository = Symbol.for("TokenCodeRepository");

export interface ITokenCodeRepository<Context = any> {
  create(data: TokenCode, ctx?: Context): Promise<TokenCode>;
  findByUserId(userId: string, ctx?: Context): Promise<null | TokenCode>;
  findByToken(token: string, ctx?: Context): Promise<null | TokenCode>;
  deleteById(tokenCodeId: string, ctx?: Context): Promise<void>;
}
