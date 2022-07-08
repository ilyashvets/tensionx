import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/contetn.module';

@Module({
  imports: [
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
