import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/contetn.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'tensionx-client', 'build'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql8.freesqldatabase.com',
      port: 3306,
      username: 'sql8504604',
      password: 'XGTdQkQIqb',
      database: 'sql8504604',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
