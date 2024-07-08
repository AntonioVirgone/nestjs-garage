import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let userService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            }
          }
        }
      ]
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);  
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all user found', async () => {
      const mockUsers = [
        { id: 1, name: 'Test User', email: 'test@test.com', age: 35 }, 
        { id: 2, name: 'Test User 2', email: 'test2@test.com', age: 45 }];
  
        jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers as []);
  
        const users = await userService.findAll();

        expect(users).toBeDefined();
        expect(users).toEqual(mockUsers);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@test.com', age: 35 };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser as any);

      const user = await userService.findOneByEmail('test@test.com');

      expect(user).toBeDefined();
      expect(user).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.findOneByEmail('test@test.com')).rejects.toThrow(NotFoundException);
    })
  });
});
