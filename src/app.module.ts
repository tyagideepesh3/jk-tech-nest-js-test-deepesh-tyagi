import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { DocumentsModule } from "./documents/documents.module";
import { User } from "./users/entities/user.entity";
import { Document } from "./documents/entities/document.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      uri: process.env.DATABASE_URL,
      models: [User, Document],
      autoLoadModels: true,
      synchronize: false, // Use migrations instead
      logging: process.env.NODE_ENV === "development" ? console.log : false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    UsersModule,
    DocumentsModule,
  ],
})
export class AppModule {}
