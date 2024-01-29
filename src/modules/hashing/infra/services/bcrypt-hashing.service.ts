import { compare, hash, genSalt } from "bcrypt";
import { injectable } from "tsyringe";

import { IHashingService } from "../../domain/services/hashing.service";

@injectable()
export class BcryptHashingService implements IHashingService {
  async hash(data: string, salt: string) {
    return await hash(data, salt);
  }

  async compare(data: string, encrypted: string) {
    if (!data || !encrypted) return false;

    return await compare(data, encrypted);
  }

  async generateSalt(rounds?: number) {
    return await genSalt(rounds);
  }
}
