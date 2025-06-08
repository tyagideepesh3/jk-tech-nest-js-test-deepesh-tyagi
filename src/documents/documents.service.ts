import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Document, DocumentStatus } from "./entities/document.entity";
import { User, UserRole } from "../users/entities/user.entity";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Op } from "sequelize";
import * as fs from "fs";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document)
    private documentModel: typeof Document
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
    userId: string
  ): Promise<Document> {
    return this.documentModel.create({
      ...createDocumentDto,
      file_name: file.originalname,
      file_path: file.path,
      mime_type: file.mimetype,
      file_size: file.size,
      uploaded_by: userId,
    });
  }

  async findAll(
    user: any,
    page: number = 1,
    limit: number = 10
  ): Promise<{ documents: Document[]; total: number }> {
    const offset = (page - 1) * limit;
    const whereClause =
      user.role !== UserRole.ADMIN ? { uploaded_by: user.id } : {};

    const { count, rows } = await this.documentModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "uploader",
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

    return {
      documents: rows,
      total: count,
    };
  }

  async findOne(id: string, user: any): Promise<Document> {
    const whereClause: any = { id };

    if (user.role !== UserRole.ADMIN) {
      whereClause.uploaded_by = user.id;
    }

    const document = await this.documentModel.findOne({
      where: whereClause,
      include: [
        {
          model: User,
          as: "uploader",
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
    });

    if (!document) {
      throw new NotFoundException("Document not found");
    }

    return document;
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    user: any
  ): Promise<Document> {
    const document = await this.findOne(id, user);

    if (user.role !== UserRole.ADMIN && document.uploaded_by !== user.id) {
      throw new ForbiddenException("You can only update your own documents");
    }

    await document.update(updateDocumentDto);
    return document;
  }

  async updateStatus(id: string, status: DocumentStatus): Promise<Document> {
    const document = await this.documentModel.findByPk(id);
    if (!document) {
      throw new NotFoundException("Document not found");
    }

    await document.update({ status });
    return document;
  }

  async remove(id: string, user: any): Promise<void> {
    const document = await this.findOne(id, user);

    if (user.role !== UserRole.ADMIN && document.uploaded_by !== user.id) {
      throw new ForbiddenException("You can only delete your own documents");
    }

    // Remove file from filesystem
    if (fs.existsSync(document.file_path)) {
      fs.unlinkSync(document.file_path);
    }

    await document.destroy();
  }

  async getDocumentsByStatus(status: DocumentStatus): Promise<Document[]> {
    return this.documentModel.findAll({
      where: { status },
      include: [
        {
          model: User,
          as: "uploader",
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }
}
