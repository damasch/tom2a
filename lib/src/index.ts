import "module-alias/register";
// tslint:disable-next-line:ordered-imports

import { ServerModule } from "@tom2a/core";

const server = new ServerModule();

server.startServer();
