import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // prefix of endpoint ==> /auth/register
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly UserServices: UserService
    ) {
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        return await this.authService.registerUser(registerUserDto);
    }


    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        return await this.authService.loginUser(loginUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.sub;

        const user = await this.UserServices.getUserById(userId)
        return {
            id: user?._id,
            fname: user?.fname,
            lname: user?.lname,
            email: user?.email
        };
    }
}
