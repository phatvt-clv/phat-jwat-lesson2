import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { Employee } from "src/entities/employees.entity";

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    //get all employees
    @Get()
    async findAllEmployees(): Promise<Employee[]> {
        return await this.employeesService.findAllEmployees();
    }

    //get one employee
    @Get(':id')
    async findEmployee(@Param('id') id: number): Promise<Employee> {
        return await this.employeesService.findEmployee(id);
    }

    //create new employee
    @Post()
    async createEmployee(@Body() emp: Employee): Promise<Employee> {
        return await this.employeesService.createEmployee(emp);
    }

    //update employee
    @Patch(':id')
    async updateEmployee(@Param('id') id: number, @Body() emp: Employee): Promise<Employee> {
        return this.employeesService.updateEmployee(id, emp);
    }

    //delete employee
    @Delete(':id')
    async deleteEmployee(@Param('id') id: number): Promise<void> {
        return await this.employeesService.deleteEmployee(id);
    }
}