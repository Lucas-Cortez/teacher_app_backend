export interface IGuard<T> {
  canActivate(context: T): boolean | Promise<boolean>;
}
