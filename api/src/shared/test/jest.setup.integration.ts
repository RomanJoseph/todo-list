import { PostgresDataSource } from '@shared/infra/typeorm/postgresOrmConfig';
import consola from 'consola';
import { DataSource } from 'typeorm';

import '@shared/container';

let connection: DataSource;

jest.setTimeout(30000);

beforeAll(async () => {
  try {
    connection = await PostgresDataSource.initialize();
    await connection.runMigrations();
  } catch (error) {
    consola.error('Erro ao conectar ao banco de dados de teste:', error);
  }
});

beforeEach(async () => {
  if (connection) {
    const queryRunner = connection.createQueryRunner();

    await queryRunner.query(`
        DO $$ DECLARE
        truncate_query TEXT := '';
    BEGIN
        SELECT 'TRUNCATE TABLE ' || string_agg(quote_ident(tablename), ', ') || ' CASCADE;'
        INTO truncate_query
        FROM pg_tables
        WHERE schemaname = current_schema();

        EXECUTE truncate_query;
    END $$;
        `);
  }
});

afterAll(async () => {
  if (connection) {
    await connection.destroy();
  }
});
