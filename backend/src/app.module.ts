import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './core/modules/category.module';
import { ExpenseModule } from './core/modules/expense.module';
import { AuthModule } from './core/auth/auth.module';
@Module({
  /*i mports: [DatabaseModule], */
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Configuración global para toda la aplicación
      envFilePath: '.env', // Asegúrate de que el archivo .env esté especificado
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule.register(),
    UserModule,
    CategoryModule,
    ExpenseModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  /* constructor(private dataSource: DataSource) { } */
}