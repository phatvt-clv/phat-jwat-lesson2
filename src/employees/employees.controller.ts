import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  employeeRepository: any;
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll(
    @Query('employeeId') employeeId?: string, 
    @Query('email') email?: string,
    @Query('name') name?: string
  ): Promise<Employee[]> {
    const employees = await this.employeesService.findAll(employeeId, email, name);
    if (employees.length === 0) {
      throw new NotFoundException(`Can't find any employee`);
    }
    return employees;
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') id: string, 
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<Employee | {message: string}> {
    const updatedEmployee = await this.employeesService.update(id, updateEmployeeDto);
    return updatedEmployee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string): Promise<boolean> {
    return await this.employeesService.delete(id);
  }
}
