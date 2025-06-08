import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { UserRole } from "@/users/entities/user.entity";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  const mockService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it("should register a user", async () => {
    const dto: RegisterDto = {
      email: "test@example.com",
      password: "password123",
      first_name: "Test",
      last_name: "User",
      role: UserRole.ADMIN,
    };

    const result = { first_name: "Test" };
    mockService.register.mockResolvedValue(result);

    expect((await controller.register(dto)).first_name).toEqual(
      result.first_name
    );
    expect(mockService.register).toHaveBeenCalledWith(dto);
  });
});
