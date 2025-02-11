import { AuthenticateUserController } from '@modules/auth/useCases/authenticateUser/AuthenticateUserController';
import { RegisterUserController } from '@modules/auth/useCases/registerUser/RegisterUserController';
import { Router } from 'express';
import { validateLoginUser, validateRegisterUser } from '../validations/auth.validations';

const authenticateUserController = new AuthenticateUserController();
const registerUserController = new RegisterUserController();

const authRouter = Router();

authRouter.post('/login',validateLoginUser, authenticateUserController.handle);
authRouter.post('/register',validateRegisterUser, registerUserController.handle);

export default authRouter;
