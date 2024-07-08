import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";

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
        })
    })
})