import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm"
import { Expense } from "./expense.entity";
import { Category } from "./category.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  usuario: string

  @Column()
  password: string;

  @Column({ default: true })
  state_: boolean

  @CreateDateColumn({ type: 'datetime' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime' })
  fecha_actualizacion: Date;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number; // Nuevo campo para el saldo del usuario

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

}