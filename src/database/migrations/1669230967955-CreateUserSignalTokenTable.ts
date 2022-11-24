import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSignalTokenTable1669230967955 implements MigrationInterface {
    name = 'CreateUserSignalTokenTable1669230967955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_signal_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "signalId" integer, CONSTRAINT "PK_cb6b075b0188442b3a1a0a42d0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_signal_token" ADD CONSTRAINT "FK_b83f0b7559841341ad1af7c6f69" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_signal_token" ADD CONSTRAINT "FK_40ddfbe857c161196eec8894748" FOREIGN KEY ("signalId") REFERENCES "signal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_signal_token" DROP CONSTRAINT "FK_40ddfbe857c161196eec8894748"`);
        await queryRunner.query(`ALTER TABLE "user_signal_token" DROP CONSTRAINT "FK_b83f0b7559841341ad1af7c6f69"`);
        await queryRunner.query(`DROP TABLE "user_signal_token"`);
    }

}
