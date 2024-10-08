import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { IUserRepository, UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { User } from "src/modules/user/domain/entities/user";
import { UserRole } from "src/modules/user/domain/enum/user-role";
import { TeacherStudent } from "../../domain/entities/teacher-student";
import { env } from "src/shared/utils/env";
import { IUnitOfWork, UnitOfWork } from "src/shared/unit-of-work/unit-of-work";
import { type IMailService, MailService } from "src/modules/mail/domain/services/mail.service";

export type InviteStudentInput = { teacherId: string; email: string };
export type InviteStudentOutput = void;

@injectable()
export class InviteStudentUseCase implements IUseCase<InviteStudentInput, InviteStudentOutput> {
  constructor(
    @inject(UnitOfWork)
    private readonly unitOfWork: IUnitOfWork,
    @inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,
    @inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(MailService)
    private readonly mailService: IMailService,
  ) {}

  async execute(input: InviteStudentInput): Promise<InviteStudentOutput> {
    await this.unitOfWork.run(async (ctx) => {
      let user = await this.userRepository.findByEmail(input.email);

      if (user?.isStudent()) throw new Error("User is not a student");

      if (!user) {
        user = User.create({ email: input.email, role: UserRole.STUDENT });
        await this.userRepository.create(user, ctx);
      }

      const student = await this.studentRepository.findByUserId(user.userId, ctx);

      if (!student) throw new Error("Student not found");

      const teacherStudent = TeacherStudent.create({
        teacherId: input.teacherId,
        studentId: student.studentId,
        active: true,
      });

      await this.studentRepository.vinculateTeacher(teacherStudent, ctx);

      if (!user.verified) {
        await this.mailService.send({
          to: [user.email],
          from: env.MAIL_FROM,
          body: "Clique no link para se cadastrar: [LINK DE CADASTRO]",
          subject: "Convite do professor",
        });
      }
    });
  }
}
