import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.findOneByEmail(email);
    }

    @Get('age/:age')
    async getUserByAge(@Param('age', ParseIntPipe) age: number | null) {
        return this.userService.findByAge(age);
    }

    @Get('ages/:ages')
    async getUserInAgeArray(@Param('ages') ages: string) {
        const ageArray = ages.split(',').map(age => parseInt(age.trim(), 10));
        return this.userService.findInAgeArray(ageArray);
    }

    @Get('age/:minAge/:maxAge')
    async getUserBetweenAge(@Param('minAge', ParseIntPipe) minAge: number, @Param('maxAge', ParseIntPipe) maxAge: number) {
        return this.userService.findBetweenAge(minAge, maxAge);
    }

    @Post()
    create(@Body() user) {
        this.userService.create(user);
    }
}
