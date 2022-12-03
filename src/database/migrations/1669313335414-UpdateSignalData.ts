import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSignalData1669313335414 implements MigrationInterface {
    name = 'UpdateSignalData1669313335414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "OrderType"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "orderType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "stopLoss"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "stopLoss" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "takeProfit"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "takeProfit" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "takeProfit"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "takeProfit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "stopLoss"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "stopLoss" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "signal_data" DROP COLUMN "orderType"`);
        await queryRunner.query(`ALTER TABLE "signal_data" ADD "OrderType" character varying NOT NULL`);
    }

}
