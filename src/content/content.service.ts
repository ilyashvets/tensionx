import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ContentService {
  constructor(private readonly jwtService: JwtService) {}

  getContent(token: string, contentFor: string) {
    const content = {
      guest: 'Content for Guest',
      user: 'Content for User',
      supervisor: 'Content for Supervisor',
      administrator: 'Content for Administrator',
    };
    const permissions = {
      guest: ['guest'],
      user: ['guest', 'user'],
      supervisor: ['guest', 'user', 'supervisor'],
      administrator: ['guest', 'user', 'supervisor', 'administrator'],
    };

    const data = this.jwtService.decode(token);

    if (permissions[data['role'].toLowerCase()].includes(contentFor)) return content[contentFor];
    else return 'Permission denied';
  }
}