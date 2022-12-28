import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1671459857299 implements MigrationInterface {
    name = 'NewMigrations1671459857299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`currency\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'The currency unique identifier', \`target\` varchar(255) NOT NULL, \`rates\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exchange\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'The exchange unique identifier', \`currency_from\` varchar(255) NOT NULL, \`currency_to\` varchar(255) NOT NULL, \`exchange_type\` varchar(255) NOT NULL, \`from_amount\` decimal(10,6) NOT NULL DEFAULT '0.000000', \`to_amount\` decimal(10,6) NOT NULL DEFAULT '0.000000', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`exchange\``);
        await queryRunner.query(`DROP TABLE \`currency\``);
    }

}
