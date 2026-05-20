import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { UserModule } from './user/user.module';
import { PmRecordModule } from './pm-record/pm-record.module';
import { AlertModule } from './alert/alert.module';
import { User } from './user/entities/user.entity';
import { Equipment } from './equipment/entities/equipment.entity';
import { PmRecord } from './pm-record/entities/pm-record.entity';
import { Alert } from './alert/entities/alert.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'pm_db',
      entities: [User, Equipment, PmRecord, Alert],
      synchronize: true, // Auto create tables for dev
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    EquipmentModule,
    UserModule,
    PmRecordModule,
    AlertModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
