import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DocumentsService } from "./documents.service";
import { DocumentsController } from "./documents.controller";
import { Document } from "./entities/document.entity";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

@Module({
  imports: [
    SequelizeModule.forFeature([Document]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uploadDir = configService.get<string>("UPLOAD_DIR") || "uploads";

        // Ensure upload directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        return {
          storage: diskStorage({
            destination: uploadDir,
            filename: (req, file, callback) => {
              const uniqueSuffix = uuidv4();
              const ext = extname(file.originalname);
              callback(null, `${uniqueSuffix}${ext}`);
            },
          }),
          fileFilter: (req, file, callback) => {
            // Allow common document types
            const allowedMimes = [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "text/plain",
              "text/csv",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ];

            if (allowedMimes.includes(file.mimetype)) {
              callback(null, true);
            } else {
              callback(new Error("Invalid file type"), false);
            }
          },
          limits: {
            fileSize: 10 * 1024 * 1024, // 10MB limit
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
