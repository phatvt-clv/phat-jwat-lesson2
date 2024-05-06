import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsNumber } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    name?: string;

    @IsEmail()
    email?: string;

    gender?: string;

    birthday?: Date;

    address?: string;

    @IsNumber()
    allowance?: number;

    phone?: string;
}
