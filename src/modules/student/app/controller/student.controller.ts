import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IController } from "src/core/abstracts/controller";
import { injectable } from "tsyringe";
import { GetStudentByTeacherUseCase } from "../use-cases/get-student-by-teacher";
import { GetStudentsByTeacherUseCase } from "../use-cases/get-students-by-teacher";
import { InviteStudentUseCase } from "../use-cases/invite-student";

@injectable()
export class StudentController implements IController {
  constructor(
    private readonly getStudentByTeacherUseCase: GetStudentByTeacherUseCase,
    private readonly getStudentsByTeacherUseCase: GetStudentsByTeacherUseCase,
    private readonly inviteStudentUseCase: InviteStudentUseCase,

  ) {}

  async register(registerInstance: FastifyInstance) {
    registerInstance.register(async (instance) => {}, { prefix: "/student" });
  }

  async getStudentByTeacher(request: FastifyRequest, reply: FastifyReply) {
    const dto = GetStudentByTeacherDto.validate(request.body);

    const data = await this.getStudentByTeacherUseCase.execute({
      studentId:
    })



    // return data
  }

  async getStudentsByTeacher(request: FastifyRequest, reply: FastifyReply) {}

  async inviteStudent(request: FastifyRequest, reply: FastifyReply) {}
}
