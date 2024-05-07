import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from '../employees.service';
import { mockEmail, mockEmployee, mockEmployeeDto, mockEmployeeRepository, mockId, mockName,  mockWrongId,  updateEmployeeWithRepeatEmail,  updatedEmployee } from './employees.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';
import { describe } from 'node:test';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EmployeeService', () => {
  let employeeService: EmployeesService;
  let employeeRepository: Repository<Employee>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(Employee);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeesService>(EmployeesService);
    employeeRepository = await module.get(USER_REPOSITORY_TOKEN);
  });

  it('should be defined service', () => {
    expect(employeeService).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(employeeRepository).toBeDefined();
  });

  describe('find employees in service', () => {
    it('should return all employees when no parameter', async () => {
      const result = await employeeService.findAll();
      expect(employeeRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return employee with employee_id is provided', async () => {
      const result = await employeeService.findAll(mockId, undefined, undefined);
      expect(employeeRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return employee with email is provided', async () => {
      const result = await employeeService.findAll(undefined, mockEmail, undefined);
      expect(employeeRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return employee with name is provided', async () => {
      const result = await employeeService.findAll(undefined, undefined, mockName);
      expect(employeeRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });
  });

  describe('create new employee in controller', () => {
    it('should show message when the email is created', async () => {
      const result = async() => {
        return await employeeService.create(mockEmployeeDto);
      }
      await expect(result()).rejects.toThrow(new BadRequestException('The email is used'));
    });

    it('should create a new employee', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(null);
      mockEmployeeRepository.save.mockResolvedValue(mockEmployeeDto);
      const result = await employeeService.create(mockEmployeeDto);
      expect(employeeRepository.findOne).toHaveBeenCalled();
      expect(employeeRepository.save).toHaveBeenCalledTimes(1);
      expect(employeeRepository.save).toHaveBeenCalledWith(mockEmployeeDto);
      expect(result).toEqual(mockEmployeeDto);
    });
  });

  describe('update an employee in service', () => {
    it('should update user by id', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(mockEmployee);
      mockEmployeeRepository.save.mockResolvedValue(mockEmployee);
      mockEmployeeRepository.update.mockResolvedValue(mockEmployee);

      const result = await employeeService.update(mockId, updatedEmployee);
      expect(employeeRepository.save).toHaveBeenCalledWith(mockEmployee);
      expect(result).toEqual({...mockEmployee, ...updatedEmployee});
    });

    it('should show message when providing wrong id', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(null);
      const result = async() => {
        return await employeeService.update(mockWrongId, updatedEmployee);
      }
      await expect(result()).rejects.toThrow(new NotFoundException('Employee is not found'));
    }); 

    it('should show message when providing wrong id', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(updateEmployeeWithRepeatEmail);
      const result = async() => {
        return await employeeService.update(mockId, updateEmployeeWithRepeatEmail);
      }
      await expect(result()).rejects.toThrow(new BadRequestException('The email is used'));
    }); 
  });

  describe('delete an employee in service', () => {
    it('delete an employee with id', async () => {
      const result = await employeeService.delete(mockId);
      expect(employeeRepository.findOne).toHaveBeenCalled();
      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { employeeId : mockId },
      });
      expect(employeeRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(employeeRepository.softDelete).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(true);
    });

    it('delete an employee with wrong id', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(null);
      const result = async() => {
        return await employeeService.delete(mockWrongId);
      }    
      expect(employeeRepository.findOne).toHaveBeenCalled();
      expect(employeeRepository.findOne).toHaveBeenCalledWith({where: { employeeId : mockWrongId }});
      await expect(result()).rejects.toThrow(new NotFoundException('The employee is not found'));
    });
  });
});