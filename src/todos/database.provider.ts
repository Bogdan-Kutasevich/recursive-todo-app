import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Todo } from './models/todo.model';
import { Module } from '@nestjs/common';

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(url, {
        dialectOptions: {
          ssl: {
            rejectUnauthorized: true,
          },
        },
      });
      sequelize.addModels([Todo]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
