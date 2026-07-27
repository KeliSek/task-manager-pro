import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    //CHECK IF EMAIL IS ALREADY USED
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //GIVE AN ERROR IF EMAIL IS USED
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    //CREATE USER DATA
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
      },
    });
    return this.signToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //CHECK IF USER DETAILS ARE CORRECT
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //COMPARE HASHES TO VERIFY PASSWORD
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.signToken(user.id, user.email);
  }

  private signToken(UserId: string, email: string) {
    const payload = { sub: UserId, email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
