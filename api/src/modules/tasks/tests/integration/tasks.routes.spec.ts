// tests/e2e/tasks.routes.spec.ts
import request from 'supertest';
import app from '@shared/infra/http/app';

describe('Tasks Routes E2E', () => {
  let authToken: string;

  beforeEach(async () => {;
    await request(app).post('/register').send({
      name: 'User Test',
      email: 'taskuser@example.com',
      password: '123456'
    });

    const loginResponse = await request(app).post('/login').send({
      email: 'taskuser@example.com',
      password: '123456'
    });

    authToken = loginResponse.body.token;
  });

  it('Deve criar uma task (POST /task)', async () => {
    const response = await request(app)
      .post('/task')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Fazer compras',
        description: 'Comprar frutas e legumes',
        status: 'pending'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('task');
    expect(response.body.task).toHaveProperty('id');
    expect(response.body.task.title).toBe('Fazer compras');
  });

  it('Deve listar todas as tasks do usuário (GET /task)', async () => {
    const response = await request(app)
      .get('/task')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tasks');
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  it('Deve buscar uma task específica (GET /task/:id)', async () => {
    const createResponse = await request(app)
      .post('/task')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Nova Task',
        description: 'descrição teste',
        status: 'pending'
      });

    const taskId = createResponse.body.task.id;

    const response = await request(app)
      .get(`/task/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('task');
    expect(response.body.task.id).toBe(taskId);
  });

  it('Deve atualizar uma task (PUT /task/:id)', async () => {
    const createResponse = await request(app)
      .post('/task')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Tarefa para atualizar',
        description: 'descrição teste',
        status: 'pending'
      });

    const taskId = createResponse.body.task.id;

    const updateResponse = await request(app)
      .put(`/task/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Tarefa Atualizada',
        status: 'done'
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('task');
    expect(updateResponse.body.task.title).toBe('Tarefa Atualizada');
    expect(updateResponse.body.task.status).toBe('done');
  });

  it('Deve deletar uma task (DELETE /task/:id)', async () => {
    const createResponse = await request(app)
      .post('/task')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Tarefa para deletar',
        description: 'teste',
        status: 'pending'
      });

    const taskId = createResponse.body.task.id;

    const deleteResponse = await request(app)
      .delete(`/task/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(deleteResponse.status).toBe(204);
  });
});
