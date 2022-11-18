import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSignalTable1668735002970 implements MigrationInterface {
    name = 'CreateSignalTable1668735002970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."signal_privacy_enum" AS ENUM('private', 'public', 'followers')`);
        await queryRunner.query(`CREATE TABLE "signal" ("id" SERIAL NOT NULL, "signalName" character varying NOT NULL, "signalDescription" character varying, "price" integer, "winRate" integer, "privacy" "public"."signal_privacy_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ownerId" integer, "statusId" integer, CONSTRAINT "PK_bc7222a78e5bc0403a1988c1daf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "signal_data" ("id" SERIAL NOT NULL, "ticker" character varying NOT NULL, "actionType" character varying NOT NULL, "OrderType" character varying NOT NULL, "stopLoss" character varying NOT NULL, "takeProfit" character varying NOT NULL, "meta" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b3139eecca137d2062ffdc4c32e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "signal" ADD CONSTRAINT "FK_631c11a5db1b7024a31038b3164" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "signal" ADD CONSTRAINT "FK_c57936ee657d948b252d258bcb0" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signal" DROP CONSTRAINT "FK_c57936ee657d948b252d258bcb0"`);
        await queryRunner.query(`ALTER TABLE "signal" DROP CONSTRAINT "FK_631c11a5db1b7024a31038b3164"`);
        await queryRunner.query(`DROP TABLE "signal_data"`);
        await queryRunner.query(`DROP TABLE "signal"`);
        await queryRunner.query(`DROP TYPE "public"."signal_privacy_enum"`);
    }

}
