import { IsEmail, IsNumber, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @MinLength(1, {message: "Name must be longer than or equal to 1 characters"})
    readonly name?: string;

    @IsEmail({}, {message: 'Email is invalid'})
    readonly email?: string;

    readonly gender?: string;

    readonly birthday?: Date;

    readonly address?: string;

    @IsNumber({}, {message: 'Allowance must be a number'})
    readonly allowance?: number;

    readonly phone?: string;
}  