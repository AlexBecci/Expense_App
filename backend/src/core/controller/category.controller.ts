import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../domain/category.entity";
import { create_category_dto } from "../domain/dtos/category/create_category_dto";
import { update_category_dto } from "../domain/dtos/category/update/update_category_dto";

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }
    //CRUD 
    @Get()
    async get_categories(): Promise<Category[]> {
        return this.categoryService.get_categories()
    }
    //get by id
    @Get(':id')
    async get_category(@Param('id') id: number): Promise<Category> {
        return this.categoryService.get_category(id)
    }
    
    @Post()
    async create_category(@Body() category_dto: create_category_dto): Promise<any> {
        return this.categoryService.create_category(category_dto)
    }

    @Put(':id')
    async update_category(@Param('id') id: number, @Body() category_dto: update_category_dto): Promise<Category> {
        return this.categoryService.update_category(id, category_dto)
    }

    @Delete(':id')
    async delete_category(@Param('id') id: number): Promise<any> {
        return this.categoryService.delete_category(id)
    }
}