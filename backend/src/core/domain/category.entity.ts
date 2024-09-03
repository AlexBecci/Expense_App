import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Expense } from "./expense.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.categories)
    user: User;

    @OneToMany(() => Expense, (expense) => expense.category)
    expenses: Expense[];
}