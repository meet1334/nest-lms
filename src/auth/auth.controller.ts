import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth') // prefix of endpoint ==> /auth/register
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        return await this.authService.registerUser(registerUserDto);
    }


    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        return await this.authService.loginUser(loginUserDto);
    }
}
