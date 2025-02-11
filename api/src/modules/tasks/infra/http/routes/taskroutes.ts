import { Router } from 'express';
import CreateTaskController from '../../useCases/createTag/CreateTaskController';
import ShowTaskController from '../../useCases/showTag/ShowTaskController';
import UpdateTaskController from '../../useCases/updateTag/UpdateTaskController';
import DeleteTaskController from '../../useCases/deleteTag/DeleteTaskController';
import ListTaskController from '../../useCases/listTag/ListTaskController';
import {
  valdiateShowTask,
  validateCreateTask,
  validateDeleteTask,
  validateUpdateTask,
} from '../validations/task.validations';

const createTaskController = new CreateTaskController();
const showTaskController = new ShowTaskController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();
const listTaskController = new ListTaskController();

const taskRouter = Router();

taskRouter.get('/task', listTaskController.handle);
taskRouter.post('/task', validateCreateTask, createTaskController.handle);
taskRouter.put('/task/:id', validateUpdateTask, updateTaskController.handle);
taskRouter.delete('/task/:id', validateDeleteTask, deleteTaskController.handle);
taskRouter.get('/task/:id', valdiateShowTask, showTaskController.handle);

export default taskRouter;
