import { IInterfaceClass } from "./interface-class";

export class ConcreteClass implements IInterfaceClass {
  printSomething(): void {
    console.log("Printing!!");
  }
}
