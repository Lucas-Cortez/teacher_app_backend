import { v4 as uuid } from "uuid";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly salt: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.salt = user.salt;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  public static restore(user: IUser) {
    return new User(user);
  }

  public static create(user: Omit<IUser, "id" | "createdAt" | "updatedAt">) {
    return new User({ ...user, id: uuid(), createdAt: new Date(), updatedAt: new Date() });
  }
}
