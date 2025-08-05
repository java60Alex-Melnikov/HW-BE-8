import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import EmployeesServiceMap from '../service/EmployeesServiceMap.js';

const app = express();
const employeesService = new EmployeesServiceMap();
dotenv.config({path:'D:/Java project 3/employees-node-main/src/controller/.env'});

app.use(express.json());
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const isValidEmployee = (employee: any): boolean => {
    return employee &&
           typeof employee.fullName === 'string' &&
           typeof employee.avatar === 'string' &&
           typeof employee.department === 'string' &&
           typeof employee.birthDate === 'string' &&
           typeof employee.salary === 'number';
};

app.get('/employees', (req, res) => {
    try {
        const employees = employeesService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/employees', (req, res) => {
    try {
        if (!isValidEmployee(req.body)) {
            res.status(400).json({ error: 'Invalid employee data' });
            return;
        }
        const newEmployee = employeesService.addEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/employees/:id', (req, res) => {
    try {
        const deleted = employeesService.deleteEmployee(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.patch('/employees/:id', (req, res) => {
    try {
        if (!isValidEmployee(req.body)) {
            res.status(400).json({ error: 'Invalid employee data' });
            return;
        }
        const updatedEmployee = employeesService.updateEmployee(req.params.id, req.body);
        if (!updatedEmployee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
