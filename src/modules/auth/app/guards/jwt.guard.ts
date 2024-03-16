import { IJwtService } from "../services/jwt.service";
import { IGuard } from "src/core/abstracts/guard";

export type JwtGuardContext = { token?: string };

export class JwtGuard implements IGuard<JwtGuardContext> {
  private _payload: any;
  constructor(private readonly jwtService: IJwtService) {}

  get payload() {
    const payload = this._payload;

    this._payload = null;

    return payload;
  }

  canActivate(context: JwtGuardContext): boolean {
    const isAllowed = this.jwtService.verify(context?.token || "");

    if (isAllowed) {
      this._payload = this.jwtService.decode(context?.token || "");
    }

    return isAllowed;
  }
}
