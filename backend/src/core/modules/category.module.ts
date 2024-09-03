import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../domain/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [],
    providers: [],
    exports: [],
})

export class CategoryModule {}