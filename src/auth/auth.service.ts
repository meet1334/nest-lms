import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async registerUser(registerUserDto: RegisterDto) {

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(registerUserDto.password, saltRounds);
        const user = await this.userService.createUser({ ...registerUserDto, password: hashPassword });

        const payload = { sub: user._id, email: user.email }
        const token = await this.jwtService.signAsync(payload);
        console.log(token)
        return token
    }

    async loginUser(loginUserDto: LoginDto) {
        const userDetails = await this.userService.findByEmail(loginUserDto);

        if (!userDetails) {
            throw new UnauthorizedException('User not found with this email');
        }

        const isPswdCorrect = await bcrypt.compare(loginUserDto.password, userDetails.password);
        if (isPswdCorrect) {
            const payload = { sub: userDetails._id, email: userDetails.email }
            const token = await this.jwtService.signAsync(payload);
            return { accesstoken: token }
        } else {
            throw new UnauthorizedException('Login credentials are not valid');
        }
    }
}
