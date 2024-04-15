import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "src/entities/employees.entity";

@Injectable()
export class EmployeesService{
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    //get all employees
    async findAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.find();
    }

    //get one employee
    async findEmployee(id: number): Promise<Employee> {
        return await this.employeeRepository.findOne({where : {id}});
    }

    //create new employee
    async createEmployee(emp: Employee): Promise<Employee> {
        const newEmployee = this.employeeRepository.create(emp);
        return await this.employeeRepository.save(newEmployee);
    }

    //update employee
    async updateEmployee(id: number, emp: Employee): Promise<Employee> {
        await this.employeeRepository.update(id, emp);
        return await this.employeeRepository.findOne({where : {id}});
    }

    //delete employee
    async deleteEmployee(id: number): Promise<void> {
        await this.employeeRepository.delete(id);
    }
}