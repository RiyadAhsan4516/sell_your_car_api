import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from "./users/user.entity";
import { Reports } from "./reports/reports.entity";
import { PasswordEncryptionSubscriber } from "./helpers/passwordEncryptionSubscriber";

let entities: any[] = [User, Reports]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: 'db.sqlite.db',
      entities,
      synchronize: true,
      subscribers: [PasswordEncryptionSubscriber]
    }),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
