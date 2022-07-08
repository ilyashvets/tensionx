import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { LoginUserDto, RegisterUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userRepository.findOneBy({ email: registerUserDto.email })

    if (user) throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)

    await this.userRepository.save(registerUserDto)

    return 'Register successfully'
  }

  async login(userData: LoginUserDto) {
    const user: User = await this.userRepository.findOneBy({ email: userData.email })

    if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)

    if (user.password !== userData.password) throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST)

    const payload = { id: user.id, role: user.role };

    return {
      email: user.email,
      role: user.role,
      token: this.jwtService.sign(payload)
    }
  }

  validate(token: string) {
    return this.jwtService.decode(token)
  }
}