import { Employee } from "../model/Employee.js";
export default interface EmployeesService {
    getAllEmployees(department?: string): Employee[];
    addEmployee(employee: Employee): Employee;
    updateEmployee(id: string, updates: Partial<Employee>): Employee;
    deleteEmployee(id: string): Employee;
}