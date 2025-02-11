import { envConfig } from '@config/envConfig';
import consola from 'consola';
import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: envConfig.database.host,
  port: envConfig.database.port,
  username: envConfig.database.username,
  password: envConfig.database.password,
  database: envConfig.database.database,
  migrations: [
    `./${envConfig.mainFolder}/shared/infra/typeorm/migrations/*{.ts,.js}`,
  ],
  entities: [
    `./${envConfig.mainFolder}/modules/**/infra/typeorm/entities/*{.ts,.js}`,
  ],
  logging: false,
  synchronize: false,
});

PostgresDataSource.initialize()
  .then(() => {
    return consola.success(
      'Conexão com o banco de dados postgres realizada com sucesso',
    );
  })
  .catch(err => {
    return consola.error('Erro ao conectar com o banco de dados postgres', err);
  });
