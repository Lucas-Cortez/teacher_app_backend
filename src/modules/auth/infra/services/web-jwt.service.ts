import { env } from "src/shared/utils/env";
import { IJwtService, JwtOptions } from "../../app/services/jwt.service";
import jwt from "jsonwebtoken";

export class WebJwtService implements IJwtService {
  private readonly secretKey: string = env.JWT_SECRET;

  verify(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  decode(token: string) {
    return jwt.decode(token);
  }

  sign(payload: string | object, options?: JwtOptions): string {
    return jwt.sign(payload, this.secretKey, { ...options });
  }
}
