import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTasks1739120038060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE tasks (
            id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),    
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'done')) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        );   
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE tasks;    
        `);
    }

}
