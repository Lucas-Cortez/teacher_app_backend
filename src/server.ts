import "reflect-metadata";

import { Server } from "./shared/infra/http/app";
import { env } from "./shared/utils/env";

const server = new Server();

server.listen(env.PORT);
