import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('employees')
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
    employeeId: string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar', nullable: true, length: 6})
    gender: string;

    @Column({nullable: true, type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    birthday: Date;

    @Column({type: 'varchar', nullable: true, length: 255})
    address: string;
    
    @Column({nullable: true})
    allowance: number;

    @Column({type: 'char', nullable: true, length: 10})
    phone: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'timestamp with time zone' })
    modifyAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
    deleteAt: Date;
}