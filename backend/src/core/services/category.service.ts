import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../domain/category.entity";
import { Repository } from "typeorm";
import { ConflictException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { create_category_dto } from "../domain/dtos/category/create_category_dto";
import { update_category_dto } from "../domain/dtos/category/update/update_category_dto";

export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryService: Repository<Category>,
    ) { }

    //function que trae las cateogiras
    async get_categories(): Promise<Category[]> {
        return this.categoryService.find()
    }


    //function que una categoria

    async get_category(id: number): Promise<Category> {
        const category = await this.categoryService.findOne({
            where: {
                id
            }
        })
        if (!category) {
            throw new HttpException('categoria not found', HttpStatus.NOT_FOUND);
        }
        return category
    }


    //funcion que trae una categoria por nombre

    async get_category_by_name(name: string) {
        const category = await this.categoryService.findOne({
            where: {
                name
            }
        })
        return category
    }

    //funcion que crea una categoria
    async create_category(category: create_category_dto) {
        const category_found = await this.get_category_by_name(category.name)
        console.log(category_found)
        if (category_found !== null) {
            throw new ConflictException("Categoria ya existente")
        }
        const new_category = await this.categoryService.create(category)
        return this.categoryService.save(new_category)
    }

    //function que updatea mi categoria
    async update_category(id: number, category_dto: update_category_dto): Promise<Category> {
        const category = await this.categoryService.findOneBy({ id })
        if (!category) {
            throw new NotFoundException(`Category With Id ${id} not Found`)
        }
        //merge data
        Object.assign(category, category_dto)
        //save the update
        return this.categoryService.save(category)
    }

    //function que elimina categorias
    async delete_category(id: number): Promise<void> {
        const category = await this.categoryService.findOneBy({ id })
        if (!category) {
            throw new NotFoundException(`Category With Id ${id} not Found`)
        }
        await this.categoryService.remove(category)
    }
}