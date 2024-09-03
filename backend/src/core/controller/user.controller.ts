import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../domain/user.entity";
import { update_user_dto } from "../domain/dtos/user/update/update_user_dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async get_user(): Promise<User[]> {
        console.log('ENTRANDO AL USERs')
        return this.userService.get_users()
    }

    @Get(':id')
    async get_user_by_id(@Param('id') id: number): Promise<User> {
        return this.userService.get_user(id)
    }

    @Put(':id')
    async update_user(@Param('id') id: number, @Body() user_dto: update_user_dto): Promise<User> {
        return this.userService.update_user(id, user_dto)
    }
}