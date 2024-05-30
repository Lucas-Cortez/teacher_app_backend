import "reflect-metadata";

import { App } from "./shared/infra/http/app";
import { env } from "./shared/utils/env";

const app = new App();

app.listen(env.PORT);
