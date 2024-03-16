import { randomUUID } from "crypto";
import { UserRole } from "../enum/user-role";

export interface IUser {
  userId: string;
  name?: string;
  email: string;
  role: UserRole;
  verified: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  public readonly userId: string;
  public readonly name?: string;
  public readonly email: string;
  public readonly role: UserRole;
  public readonly verified: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private constructor(user: IUser) {
    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.verified = user.verified;
  }

  public static restore(user: IUser) {
    return new User(user);
  }

  public static create(user: Omit<IUser, "userId" | "verified">) {
    return new User({ ...user, verified: false, userId: randomUUID() });
  }

  public isStudent() {
    return this.role === UserRole.STUDENT;
  }
}
