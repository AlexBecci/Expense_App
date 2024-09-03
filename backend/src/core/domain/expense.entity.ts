import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.expenses)
    user: User

    @Column()
    description: string

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @CreateDateColumn({ type: 'datetime' })
    date: Date;

    @ManyToOne(() => Category, (category) => category.expenses)
    category: Category;
}