import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ["password"] },
      order: [["created_at", "DESC"]],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userModel.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }
    }

    await user.update(updateUserDto);
    return user;
  }

  async updateRole(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto
  ): Promise<User> {
    const user = await this.findById(id);
    await user.update({ role: updateUserRoleDto.role });
    return user;
  }

  async toggleActiveStatus(id: string): Promise<User> {
    const user = await this.findById(id);
    await user.update({ is_active: !user.is_active });
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }
}
