import { Employee } from "../model/Employee.js";
import EmployeesService from "./EmployeesService.js";

export default class EmployeesServiceMap implements EmployeesService {
    private employees: Map<string, Employee> = new Map();
    private idCounter: number = 1;

    getAllEmployees(department?: string): Employee[] {
        return department
            ? Array.from(this.employees.values()).filter(emp => emp.department === department)
            : Array.from(this.employees.values());
    }

    addEmployee(employee: Employee): Employee {
        const id = this.generateId();
        const newEmployee: Employee = { ...employee, id };
        this.employees.set(id, newEmployee);
        return newEmployee;
    }

    updateEmployee(id: string, updates: Partial<Employee>): Employee {
        const existingEmployee = this.employees.get(id);
        if (!existingEmployee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        const updatedEmployee: Employee = { ...existingEmployee, ...updates, id };
        this.employees.set(id, updatedEmployee);
        return updatedEmployee;
    }

    deleteEmployee(id: string): Employee {
        const employee = this.employees.get(id);
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        this.employees.delete(id);
        return employee;
    }

    private generateId(): string {
        const id = (Date.now() + this.idCounter).toString();
        this.idCounter++;
        return id;
    }
}