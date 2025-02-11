import request from 'supertest';
import app from '@shared/infra/http/app';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';
import { EncryptService } from '@shared/plugins/encrypt/EncryptService';

describe('Auth Routes E2E', () => {
  const userRepository = container.resolve(UserRepository);
  let encriptService: EncryptService = new EncryptService();

  it('Deve registrar um usuário com sucesso (POST /register)', async () => {
    const response = await request(app).post('/register').send({
      name: 'Novo Usuário',
      email: 'user@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('user@example.com');
  });

  it('Deve falhar ao tentar registrar um usuário com email já existente', async () => {
    await userRepository.save({
      name: 'Usuario Já Cadastrado',
      email:'user@example.com',
      password: 'alguma_senha_hasheada'
    })

    const response = await request(app).post('/register').send({
      name: 'Novo Usuário 2',
      email: 'user@example.com',
      password: '123456',
    });

    expect(response.status).toBe(400); // ou 409, dependendo de como seu controller retorna
    expect(response.body).toHaveProperty('success', false);
  });

  it('Deve logar o usuário e retornar token (POST /login)', async () => {
    await userRepository.save({
      name: 'Usuario Já Cadastrado',
      email:'user@example.com',
      password: await encriptService.encryptPassword('123456')
    })

    const response = await request(app).post('/login').send({
      email: 'user@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe('user@example.com');
  });

  it('Deve falhar ao logar com senha incorreta', async () => {
    const response = await request(app).post('/login').send({
      email: 'user@example.com',
      password: 'senhaErrada',
    });

    expect([400, 401]).toContain(response.status);
    expect(response.body).toHaveProperty('success', false);
  });
});
