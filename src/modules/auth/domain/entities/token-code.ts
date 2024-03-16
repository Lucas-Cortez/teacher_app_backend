import { randomUUID } from "crypto";

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
    this.tokenCodeId = tokenCode.tokenCodeId;
    this.token = tokenCode.token;
    this.expiredAt = tokenCode.expiredAt;
    this.userId = tokenCode.userId;
  }

  public static restore(tokenCode: ITokenCode) {
    return new TokenCode(tokenCode);
  }

  public static create(tokenCode: Omit<ITokenCode, "tokenCodeId">) {
    return new TokenCode({ ...tokenCode, tokenCodeId: randomUUID() });
  }

  public isExpired() {
    return this.expiredAt.getTime() < Date.now();
  }
}
