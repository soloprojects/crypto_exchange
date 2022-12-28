import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExchangeColumn1671921803369 implements MigrationInterface {
    name = 'UpdateExchangeColumn1671921803369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_from\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_from\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_to\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_to\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_to\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_to\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` DROP COLUMN \`amount_from\``);
        await queryRunner.query(`ALTER TABLE \`exchange\` ADD \`amount_from\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
    }

}
