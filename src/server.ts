import "reflect-metadata";

import { App } from "./shared/infra/http/app";
import { env } from "./shared/utils/env";
import { appContainer } from "./shared/container/app-container";

appContainer;

const app = new App();

app.listen(env.PORT);
