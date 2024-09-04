import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../domain/category.entity";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../services/category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})

export class CategoryModule { }