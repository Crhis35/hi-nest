import { Module } from '@nestjs/common';

import * as Joi from 'joi';

import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './client/clients.module';
import { PackagesModule } from './packages/packages.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test', 'production'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_URL: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logging:
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      synchronize: process.env.NODE_ENV !== 'production',
      url: process.env.DATABASE_URL,
      autoLoadEntities: process.env.NODE_ENV !== 'production',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
        encrypt: false,
      },
    }),
    InvoicesModule,
    ClientsModule,
    PackagesModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
