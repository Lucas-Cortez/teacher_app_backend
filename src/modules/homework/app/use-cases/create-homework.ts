import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";

export type CreateHomeworkInput = { teacherId: string };
export type CreateHomeworkOutput = {};

@injectable()
export class CreateHomeworkUseCase implements IUseCase<CreateHomeworkInput, CreateHomeworkOutput> {
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: CreateHomeworkInput): Promise<CreateHomeworkOutput> {
    throw new Error("Not implemented");
  }
}
