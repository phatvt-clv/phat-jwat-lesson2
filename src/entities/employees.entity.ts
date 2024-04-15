import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    allowance: number;
}