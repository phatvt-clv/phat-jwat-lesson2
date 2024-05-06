import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { employeesServiceMock, mockEmail, mockEmployee, mockId, mockName, mockWrongName, updatedEmployee } from './employees.mock';
import { describe } from 'node:test';
import { NotFoundException } from '@nestjs/common';

describe('EmployeesController', () => {
  let employeeController: EmployeesController;
  let employeeService: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesController,
        {
          provide: EmployeesService,
          useValue: employeesServiceMock,
        },
      ],
    }).compile();

    employeeController = module.get<EmployeesController>(EmployeesController);
    employeeService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined controller', () => {
    expect(employeeController).toBeDefined();
  });

  describe('find employees in controller', () => {
    it('should return all employees when no parameter', async () => {
      const result = await employeeController.findAll();
      expect(employeeService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return employee with employee_id is provided', async () => {
      const result = await employeeController.findAll(mockId, undefined, undefined);
      expect(result).toEqual([mockEmployee]);
    });  

    it('should return employee with email is provided', async () => {
      const result = await employeeController.findAll(undefined, mockEmail, undefined);
      expect(result).toEqual([mockEmployee]);
    });  

    it('should return employee with name is provided', async () => {
      const result = await employeeController.findAll(undefined, undefined, mockName);
      expect(result).toEqual([mockEmployee]);
    });

    it('should return message with wrong name is provided', async () => {
      const result = async() => {
        return await employeeController.findAll(undefined, undefined, mockWrongName);
      }
      expect(result()).rejects.toThrow(new NotFoundException(`Can't find any employee`));
    });
  });

  describe('create new employee in controller', () => {
    it('should create a new employee', async () => {
      const result = await employeeController.create(mockEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('update an employee in controller', () => {
    it('should update user by id', async () => {
      const result = await employeeController.updateEmployee(mockId, updatedEmployee);
      expect(employeeService.update).toHaveBeenCalledWith(mockId, updatedEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('delete an employee in controller', () => {
    it('should delete user by id', async () => {
      const result = await employeeController.deleteEmployee(mockId);
      expect(result).toEqual(null);
    });
  });
});