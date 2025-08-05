import { Employee } from "../model/Employee.js";
export default interface EmployeesService {
    getAllEmployees(): Employee[];
    addEmployee(employee: Employee): Employee;
    updateEmployee(id: string, employee: Employee): Employee | null;
    deleteEmployee(id: string): boolean;
}