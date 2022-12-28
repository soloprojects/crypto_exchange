import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExchangeAmountColumn1671884789566 implements MigrationInterface {
    name = 'UpdateExchangeAmountColumn1671884789566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`from_amount\` \`from_amount\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`to_amount\` \`to_amount\` decimal(20,9) NOT NULL DEFAULT '0.000000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`to_amount\` \`to_amount\` decimal(10,6) NOT NULL DEFAULT '0.000000'`);
        await queryRunner.query(`ALTER TABLE \`exchange\` CHANGE \`from_amount\` \`from_amount\` decimal(10,6) NOT NULL DEFAULT '0.000000'`);
        await queryRunner.query(`ALTER TABLE \`currency\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP`);
    }

}
