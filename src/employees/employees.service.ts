import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { validate as isValidUUID } from 'uuid';

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

  async getEmployeeById(
    @Param('id') id: string
  ): Promise<Employee> {
    const employees = await this.employeeRepository.findOne({where: {employeeId : id}});
    if (!employees) {
      throw new NotFoundException(`Can't find any employee`);
    }
    return employees;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if(!isValidUUID(id))
      throw new NotFoundException('Employee is not found');

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

  async delete(id: string): Promise<Employee> {
    if(!isValidUUID(id))
      throw new NotFoundException('Employee is not found');
    const film = await this.employeeRepository.findOne({where: {employeeId: id}});
    if (!film) {
      throw new NotFoundException('Employee is not found');
    }
    try {
      await this.employeeRepository.softDelete(id);
      return film;
    } catch (error) {
      throw new BadRequestException(`Can't delete employee`);
    }
  }
}
