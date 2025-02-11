import authRouter from "@modules/auth/infra/http/routes/authroutes";
import { EnsureAuthenticateService } from "@modules/auth/middleware/EnsureAuthenticateService";
import taskRouter from "@modules/tasks/infra/http/routes/taskroutes";
import { Router } from "express";
import { container } from "tsyringe";

const routes = Router();
routes.use(authRouter);

routes.use(container.resolve(EnsureAuthenticateService).execute);

routes.use(taskRouter);

export default routes;
