import { inject, injectable, singleton } from "tsyringe";
import { type IInterfaceClass, InterfaceClass } from "./interface-class";

// @singleton()
@injectable()
export class InjectableClass {
  constructor(
    @inject(InterfaceClass)
    private readonly interfaceClass: IInterfaceClass,
  ) {
    console.log("InjectableClass created");
  }

  print() {
    this.interfaceClass.printSomething();
  }
}
