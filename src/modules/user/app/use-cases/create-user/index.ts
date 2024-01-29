import { IUseCase } from "src/core/abstracts/use-case";
import { IHashingService } from "src/modules/hashing/domain/services/hashing.service";
import { User } from "src/modules/user/domain/entities/user";
import { IUserRepository } from "src/modules/user/domain/repositories/user-repository";

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};
export type CreateUserOutput = User;

export class CreateUserUseCase implements IUseCase<CreateUserInput, CreateUserOutput> {
  constructor(
    private readonly usersRepository: IUserRepository,
    private readonly hashingService: IHashingService,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const userExists = await this.usersRepository.findByEmail(input.email);

    if (userExists) throw new Error("User already exists.");

    const salt = await this.hashingService.generateSalt();
    const password = await this.hashingService.hash(input.password, salt);

    const user = User.create({ ...input, password, salt });

    await this.usersRepository.create(user);

    return user;
  }
}
