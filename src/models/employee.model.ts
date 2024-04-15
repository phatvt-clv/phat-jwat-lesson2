export class Employee {
    id?: number;
    name?: string;
    allowance?: number;
    email?: string;

    constructor({ id, name, allowance, email }) {
        if (id !== undefined) this.id = id;
        if (name !== undefined) this.name = name;
        if (email !== undefined) this.email = email;
        if (allowance !== undefined) this.allowance = allowance;
    }
}