import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExchangeColumn1671915994467 implements MigrationInterface {
    name = 'UpdateExchangeColumn1671915994467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`from_amount\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`to_amount\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_from\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_to\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_to\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_from\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`to_amount\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`from_amount\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
    }

}
