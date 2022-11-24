import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSignalRelation1669229472521 implements MigrationInterface {
    name = 'UpdateSignalRelation1669229472521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signal" ADD "signalDataId" integer`);
        await queryRunner.query(`ALTER TABLE "signal" ADD CONSTRAINT "UQ_10323ab517aeebd0fc7ec997773" UNIQUE ("signalDataId")`);
        await queryRunner.query(`ALTER TABLE "signal" ADD CONSTRAINT "FK_10323ab517aeebd0fc7ec997773" FOREIGN KEY ("signalDataId") REFERENCES "signal_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signal" DROP CONSTRAINT "FK_10323ab517aeebd0fc7ec997773"`);
        await queryRunner.query(`ALTER TABLE "signal" DROP CONSTRAINT "UQ_10323ab517aeebd0fc7ec997773"`);
        await queryRunner.query(`ALTER TABLE "signal" DROP COLUMN "signalDataId"`);
    }

}
