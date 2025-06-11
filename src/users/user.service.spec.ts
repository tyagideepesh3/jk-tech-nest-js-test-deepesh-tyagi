import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getModelToken } from "@nestjs/sequelize";
import { User, UserRole } from "./entities/user.entity";
import { ConflictException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

describe("UsersService - create", () => {
  let service: UsersService;
  let userModel: any;

  const mockUserData: CreateUserDto = {
    email: "test@example.com",
    password: "test123",
    first_name: "Test",
    last_name: "User",
    role: UserRole.ADMIN,
  };

  const mockUserInstance = {
    id: "123",
    ...mockUserData,
    toJSON: () => ({ id: "123", ...mockUserData }),
  };

  beforeEach(async () => {
    userModel = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should create a new user when email does not exist", async () => {
    userModel.findOne.mockResolvedValue(null);
    userModel.create.mockResolvedValue(mockUserInstance);

    const result = await service.create(mockUserData);

    expect(userModel.findOne).toHaveBeenCalledWith({
      where: { email: mockUserData.email },
    });
    expect(userModel.create).toHaveBeenCalledWith(mockUserData);
    expect(result).toEqual(mockUserInstance);
  });

  it("should throw ConflictException if user already exists", async () => {
    userModel.findOne.mockResolvedValue(mockUserInstance);

    await expect(service.create(mockUserData)).rejects.toThrow(
      ConflictException
    );

    expect(userModel.findOne).toHaveBeenCalledWith({
      where: { email: mockUserData.email },
    });
    expect(userModel.create).not.toHaveBeenCalled();
  });
});
