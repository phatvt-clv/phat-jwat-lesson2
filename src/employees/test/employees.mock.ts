export const mockEmployee = {
    "employeeId": "b9f5fb0b-a635-45ef-919d-54c552421afb",
    "name": "Emily Davis",
    "email": "emily@example.com",
    "gender": "Female",
    "birthday": new Date("1992-03-19T17:00:00.000Z"),
    "address": "101 Maple Road",
    "allowance": 1600,
    "phone": "3456789012"
};

export const mockEmployeeDto = {
    "name": "Emily Davis",
    "email": "newemail@example.com",
    "gender": "Female",
    "birthday": new Date("1992-03-19T17:00:00.000Z"),
    "address": "101 Maple Road",
    "allowance": 1600,
    "phone": "3456789012"
};

export const updatedEmployee = {
    "allowance": 5000
}

export const updateEmployeeWithRepeatEmail = {
    "email": "emily@example.com"
}

export const mockId = "b9f5fb0b-a635-45ef-919d-54c552421afb";
export const mockWrongId = "a9f5fb0b-a635-45ef-919d-54c552421afb";
export const mockEmail = "emily@example.com";
export const mockName = "Emily";
export const mockWrongName = "abcd";

export const employeesServiceMock = {
    findAll: jest.fn().mockImplementation((employeeId, email, name) => {
        if (name === mockWrongName)
            return [];
        else
            return [mockEmployee];
    }), 
    create: jest.fn().mockResolvedValue(mockEmployee),
    update: jest.fn().mockResolvedValue(mockEmployee),
    delete: jest.fn().mockResolvedValue(null),
};

export const mockEmployeeRepository = {
    create: jest.fn().mockResolvedValue(mockEmployeeDto),
    update: jest.fn(),
    findOne: jest.fn().mockResolvedValue(mockEmployee),
    find: jest.fn().mockResolvedValue([mockEmployee]),
    save: jest.fn(),
    softDelete: jest.fn(),
};
