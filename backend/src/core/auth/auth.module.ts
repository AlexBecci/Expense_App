import { DynamicModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { merge } from "rxjs";
import { UserModule } from "../modules/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
    }
    static register(): DynamicModule {
        return {
            module: AuthModule,
            imports: [UserModule, PassportModule,
                JwtModule.register({
                    global: true,
                    secret: jwtConstants.secret,
                    /*  secretOrPrivateKey: jwtConstants.secret, */
                    signOptions: { expiresIn: '2h' }
                })],
            providers: [AuthService, JwtStrategy],
            controllers: [AuthController]
        }
    }

}
