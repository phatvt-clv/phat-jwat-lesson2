import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const checkEmployee = await this.employeeRepository.findOne({where: {email: createEmployeeDto.email}});
    if (checkEmployee) {
      throw new BadRequestException("The email is used");
    }
    return this.employeeRepository.save(createEmployeeDto);
  }

  async findAll(employeeId?: string, email?: string, name?: string): Promise<Employee[]> {
    const conditions: { employeeId?: any, email?: any, name?: any } = {};
    if (employeeId) conditions.employeeId = employeeId;
    if (email) conditions.email = ILike(`%${email}%`);
    if (name) conditions.name = ILike(`%${name}%`);
    return await this.employeeRepository.find({where: conditions});
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({where: {employeeId: id}});

    if (!employee)
      throw new NotFoundException('Employee is not found');

    if (updateEmployeeDto.email) {
      const employeeWithRepeatEmail = await this.employeeRepository.findOne({where: {email: updateEmployeeDto.email}});
      if (employeeWithRepeatEmail)
        throw new BadRequestException('The email is used');
    }

    try {
      Object.assign(employee, updateEmployeeDto);
      return this.employeeRepository.save(employee);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Can't update employee`);
    }
  }

  async delete(id: string): Promise<boolean> {
    const film = await this.employeeRepository.findOne({where: {employeeId: id}});
    if (!film) {
      throw new NotFoundException('The employee is not found');
    }
    try {
      await this.employeeRepository.softDelete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
