import { Employee } from "../model/Employee.js";
import EmployeesService from "./EmployeesService.js";

export default class EmployeesServiceMap implements EmployeesService {
    private employees: Map<string, Employee> = new Map();

    constructor() {
        this.initialSample();
    }
    private initialSample(): void {
        const sampleEmployees: Employee[] = [
            {
                fullName: "Ivan",
                avatar: "https://i.pravatar.cc/150?img=1",
                department: "Engineering",
                birthDate: "1990-03-15",
                salary: 25000
            },
            {
                fullName: "Alexander",
                avatar: "https://i.pravatar.cc/150?img=2",
                department: "Marketing",
                birthDate: "1988-07-22",
                salary: 22000
            },
            {
                fullName: "Valentina",
                avatar: "https://i.pravatar.cc/150?img=3",
                department: "Sales",
                birthDate: "1992-11-08",
                salary: 28000
            }
        ];

        sampleEmployees.forEach((employee, index) => {
            const id = (Date.now() + index).toString();
            const employeeWithId: Employee = { ...employee, id };
            this.employees.set(id, employeeWithId);
        });
    }
    getAllEmployees(): Employee[] {
        return Array.from(this.employees.values());
    }

    addEmployee(employee: Employee): Employee {
        const id = this.generateId();
        const newEmployee: Employee = { ...employee, id };
        this.employees.set(id, newEmployee);
        return newEmployee;
    }

    updateEmployee(id: string, employee: Employee): Employee | null {
        if (!this.employees.has(id)) {
            return null;
        }
        const updatedEmployee: Employee = { ...employee, id };
        this.employees.set(id, updatedEmployee);
        return updatedEmployee;
    }

    deleteEmployee(id: string): boolean {
        return this.employees.delete(id);
    }

    private generateId(): string {
        return Date.now().toString();
    }
}