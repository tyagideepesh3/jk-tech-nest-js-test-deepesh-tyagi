import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";

export enum DocumentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

@Table({
  tableName: "documents",
  timestamps: true,
})
export class Document extends Model<Document> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  file_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  file_path: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mime_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  file_size: number;

  @Column({
    type: DataType.ENUM(...Object.values(DocumentStatus)),
    allowNull: false,
    defaultValue: DocumentStatus.PENDING,
  })
  status: DocumentStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  uploaded_by: string;

  @BelongsTo(() => User)
  uploader: User;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
