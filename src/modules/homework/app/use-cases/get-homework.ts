import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";

export type GetHomeworkInput = { homeworkId: string };
export type GetHomeworkOutput = Homework;

@injectable()
export class GetHomeworkUseCase implements IUseCase<GetHomeworkInput, GetHomeworkOutput> {
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: GetHomeworkInput): Promise<GetHomeworkOutput> {
    const homework = await this.homeworkRepository.findById(input.homeworkId);

    if (!homework) throw new Error("Homework not found");

    return homework;
  }
}
