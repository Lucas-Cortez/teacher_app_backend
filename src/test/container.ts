import { container as appContainer } from "tsyringe";
// import { IInterfaceClass, InterfaceClass } from "./interface-class";
import { ConcreteClass } from "./concrete-class";
import { InjectableClass } from "./injectable-class";
import { IInterfaceClass, InterfaceClass } from "./interface-class";

appContainer.registerSingleton(InterfaceClass, ConcreteClass);
appContainer.registerSingleton(InjectableClass, InjectableClass);

const opa = appContainer.resolve<IInterfaceClass>(InterfaceClass);
const epa = appContainer.resolve<InjectableClass>(InjectableClass);
const epa2 = appContainer.resolve<InjectableClass>(InjectableClass);

// console.log(appContainer);

epa.print();

export { appContainer };
