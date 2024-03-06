import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { IUserRepository, UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { User } from "src/modules/user/domain/entities/user";
import { UserRole } from "src/modules/user/domain/enum/user-role";
import { TeacherStudent } from "../../domain/entities/teacher-student";
import { IMailService, MailService } from "src/shared/services/mail.service";
import { env } from "src/shared/utils/env";

export type InviteStudentInput = { teacherId: string; email: string };
export type InviteStudentOutput = void;

@injectable()
export class InviteStudentUseCase implements IUseCase<InviteStudentInput, InviteStudentOutput> {
  constructor(
    @inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,
    @inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(MailService)
    private readonly mailService: IMailService,
  ) {}

  async execute(input: InviteStudentInput): Promise<InviteStudentOutput> {
    let user = await this.userRepository.findByEmail(input.email);

    if (user?.role !== UserRole.STUDENT) throw new Error("User is not a student");

    if (!user) {
      const newUser = User.create({ email: input.email, role: UserRole.STUDENT });
      user = await this.userRepository.create(newUser);
    }

    const student = await this.studentRepository.findByUserId(user.userId);

    if (!student) throw new Error("Student not found");

    const teacherStudent = TeacherStudent.create({
      teacherId: input.teacherId,
      studentId: student.studentId,
      active: true,
    });

    await this.studentRepository.vinculateTeacher(teacherStudent);

    if (!user.verified) {
      await this.mailService.send({
        to: [user.email],
        from: env.MAIL_FROM,
        body: "Clique no link para se cadastrar: [LINK DE CADASTRO]",
        subject: "Convite do professor",
      });
    }
  }
}

// verificar se usuario existe
// verificar se usuario é estudante
// caso não seja, cancelar operação
// se não existir, criar estudante
// vincular estudante ao professor
// enviar email para estudante com link para cadastro
