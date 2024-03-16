export const UnitOfWork = Symbol.for("UnitOfWork");

export interface IUnitOfWork {
  run(fn: (ctx: any) => any): Promise<any>;
}
