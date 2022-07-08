import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentGateway } from './content.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [],
  providers: [ContentGateway, ContentService, JwtService],
})
export class ContentModule {}
