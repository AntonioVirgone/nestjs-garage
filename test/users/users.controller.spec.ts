import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../../src/users/users.controller";
import { UsersService } from "../../src/users/users.service";

describe('UserController', () => {
    let userController: UsersController;
    let userService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findAll: jest.fn(),
                        findOneByEmail: jest.fn(),
                    }
                }
            ],
        }).compile();

        userController = module.get<UsersController>(UsersController);
        userService = module.get<UsersService>(UsersService);
    });

    describe('root', () => {
        it('should return all users', async () => {
            const mockUsers = [
                { id: 1, name: 'Test User', email: 'test@test.com', age: 35 },
                { id: 2, name: 'Test User 2', email: 'test2@test.com', age: 45 }];

            jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers as []);

            const result = await userController.getAllUsers();

            expect(result).toEqual(mockUsers);
        });

        it('should return user by email', async () => {
            const mockUser = { id: 1, name: 'Test User', email: 'test@test.com', age: 35 };

            jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser as any);

            const result = await userController.getUserByEmail('test@test.com');

            expect(result).toEqual(mockUser);
        });
    });
})