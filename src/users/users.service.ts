import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [];

    findAll() {
        return this.users;
    }

    create(user) {
        this.users.push(user);
    }
}
