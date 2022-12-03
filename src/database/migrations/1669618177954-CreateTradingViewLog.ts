import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTradingViewLog1669618177954 implements MigrationInterface {
    name = 'CreateTradingViewLog1669618177954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trading_view_log" ("id" SERIAL NOT NULL, "meta" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "signalId" integer, CONSTRAINT "PK_3bc66f39b6ae8e0e9e4ec16fee0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trading_view_log" ADD CONSTRAINT "FK_ffd3dbd6c8792b1c4d2b603a5a0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trading_view_log" ADD CONSTRAINT "FK_680eccf8a87ff3607f9e1faa008" FOREIGN KEY ("signalId") REFERENCES "signal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trading_view_log" DROP CONSTRAINT "FK_680eccf8a87ff3607f9e1faa008"`);
        await queryRunner.query(`ALTER TABLE "trading_view_log" DROP CONSTRAINT "FK_ffd3dbd6c8792b1c4d2b603a5a0"`);
        await queryRunner.query(`DROP TABLE "trading_view_log"`);
    }

}
