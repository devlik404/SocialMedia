import { MigrationInterface, QueryRunner } from "typeorm";

export class Mymigration1691650479924 implements MigrationInterface {
    name = 'Mymigration1691650479924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" ADD "threadsId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "threadsId"`);
    }

}
