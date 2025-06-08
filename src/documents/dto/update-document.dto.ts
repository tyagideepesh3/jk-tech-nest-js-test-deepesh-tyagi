import { IsString, IsOptional, IsEnum } from 'class-validator';
import { DocumentStatus } from '../entities/document.entity';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;
}