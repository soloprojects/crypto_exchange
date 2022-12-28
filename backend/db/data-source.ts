import { DataSource, DataSourceOptions } from 'typeorm';

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/db/migrations/*.js'],
//   synchronize: true,
// };

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'nest-crypto',
  password: '',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
