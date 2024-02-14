export type JwtOptions = {
  expiresIn?: string | number;
  subject?: string;
  issuer?: string;
};

export const JwtService = Symbol.for("JwtService");

export interface IJwtService {
  verify(token: string): boolean;
  sign(payload: string | object, options?: JwtOptions): string;
  decode(token: string): any;
  // decode(token: string): DecodedUserToken;
}
