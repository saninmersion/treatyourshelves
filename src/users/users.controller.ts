import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    find(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password)
    }

    @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const user = this.userService.findOne(parseInt(id))

        if(!user) {
            throw new NotFoundException('User not found.')
        }

        return user
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(parseInt(id))
    }
}
