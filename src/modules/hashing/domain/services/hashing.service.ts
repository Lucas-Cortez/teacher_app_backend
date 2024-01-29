export interface IHashingService {
  hash(data: string, salt: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
  generateSalt(rounds?: number): Promise<string>;
}
