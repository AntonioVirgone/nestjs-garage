import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() userData: {email: string, name: string, password?: string}) {
        this.userService.create(userData);
    }
}
