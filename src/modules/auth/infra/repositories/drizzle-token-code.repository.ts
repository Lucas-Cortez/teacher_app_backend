import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ITokenCodeRepository } from "../../domain/repositories/token-code.repository";
import { TokenCode } from "../../domain/entities/token-code";

export class DrizzleTokenCodeRepository implements ITokenCodeRepository {
  // constructor(private readonly drizzleClient: PostgresJsDatabase) {}

  async create(data: TokenCode): Promise<TokenCode> {
    throw new Error("Method not implemented.");
  }

  async findByUserId(userId: string): Promise<TokenCode | null> {
    throw new Error("Method not implemented.");
  }

  async findByToken(token: string): Promise<TokenCode | null> {
    throw new Error("Method not implemented.");
  }

  async deleteById(tokenCodeId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
