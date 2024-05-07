import { IsEmail, IsNumber, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @MinLength(1, {message: "Name is not empty"})
    readonly name?: string;

    @MinLength(1, {message: 'Email is not empty'})
    @IsEmail({}, {message: 'Email is invalid'})
    readonly email?: string;

    readonly gender?: string;

    readonly birthday?: Date;

    readonly address?: string;

    @IsNumber({}, {message: 'Allowance must be a number'})
    readonly allowance?: number;

    @MinLength(1, {message: 'Phone number is not empty'})
    readonly phone?: string;
}  