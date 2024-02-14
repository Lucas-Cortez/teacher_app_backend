import { v4 as uuid } from "uuid";

export interface ITokenCode {
  tokenCodeId: string;
  token: string;
  expiredAt: Date;

  userId: string;
}

export class TokenCode implements ITokenCode {
  public readonly tokenCodeId: string;
  public readonly token: string;
  public readonly expiredAt: Date;

  public readonly userId: string;

  private constructor(tokenCode: ITokenCode) {
    Object.assign(this, tokenCode);
  }

  public static restore(tokenCode: ITokenCode) {
    return new TokenCode(tokenCode);
  }

  public static create(tokenCode: Omit<ITokenCode, "tokenCodeId">) {
    return new TokenCode({ ...tokenCode, tokenCodeId: uuid() });
  }
}
