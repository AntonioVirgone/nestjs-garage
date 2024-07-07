import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { equal } from 'assert';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findByAge(age: number | null) {
    this.logger.log(`Search by age ${age}`);
    return this.prisma.user.findMany({
      where: { age: age !== null ? { equals: age } : undefined }
    })
  }

  async findInAgeArray(ages: number[]) {
    this.logger.log(`Search age in ${ages}`);

    return this.prisma.user.findMany({
      where: {
        age: {
          in: ages,
        }
      }
    });
  }


  async findBetweenAge(minAge: number, maxAge: number) {
    this.logger.log(`Search between age min ${minAge} and max ${maxAge}`);

    return this.prisma.user.findMany({
      where: {
        AND: [
          {
            age: {
              gte: minAge,
            },
          },
          {
            age: {
              lte: maxAge,
            },
          },
        ]
      }
    });
  }

  async create(data) {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Unique constraint failed on the fields: `email`');
        }
      }
      throw error; // Rethrow other errors
    }
  }
}
