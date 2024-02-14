import { v4 as uuid } from "uuid";

export interface IUser {
  userId: string;
  name: string;
  email?: string;
  role: string;
  verified: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  public readonly userId: string;
  public readonly name: string;
  public readonly email?: string;
  public readonly role: string;
  public readonly verified: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private constructor(user: IUser) {
    Object.assign(this, user);
  }

  public static restore(user: IUser) {
    return new User(user);
  }

  public static create(user: Omit<IUser, "userId">) {
    return new User({ ...user, userId: uuid() });
  }
}
