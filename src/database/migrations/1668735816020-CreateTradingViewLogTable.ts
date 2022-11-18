import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTradingViewLogTable1668735816020 implements MigrationInterface {
    name = 'CreateTradingViewLogTable1668735816020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trading_view_log" ("id" SERIAL NOT NULL, "meta" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3bc66f39b6ae8e0e9e4ec16fee0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trading_view_log"`);
    }

}
