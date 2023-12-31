import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    const { name, firstname, password, email } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité user
    const user = this.userRepository.create({
      name,
      password: hashedPassword,
      email,
      firstname
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Ce username existe déjà');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    //recherche de l'user dans la bdd 
    const user = await this.userRepository.findOneBy({ email });

    //si user trouvé et que le mot de passe correspond
    if (user && (await bcrypt.compare(password, user.password))) {

      //preparation du  payload du token
      const payload = {
        user_id: user.id,
        sub: user.firstname,
      };
      //signature et génération du token
      const accessToken = this.jwtService.sign(payload);

      //retour du token et des infos de l'user 
      return { accessToken, user_id: user.id, sub: user.firstname };
    } else {

      //si infos authentification incorrect 
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }
}
