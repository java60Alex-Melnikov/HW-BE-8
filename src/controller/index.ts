import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import EmployeesServiceMap from '../service/EmployeesServiceMap.js';

dotenv.config();

const app = express();
const employeesService = new EmployeesServiceMap();

app.use(express.json());
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/employees', (req, res, next) => {
    try {
        const department = req.query.department as string;
        const employees = employeesService.getAllEmployees(department);
        res.json(employees);
    } catch (error) {
        next(error);
    }
});

app.post('/employees', (req, res, next) => {
    try {
        const newEmployee = employeesService.addEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        next(error);
    }
});

app.delete('/employees/:id', (req, res, next) => {
    try {
        const deletedEmployee = employeesService.deleteEmployee(req.params.id);
        res.json(deletedEmployee);
    } catch (error) {
        next(error);
    }
});

app.patch('/employees/:id', (req, res, next) => {
    try {
        const updatedEmployee = employeesService.updateEmployee(req.params.id, req.body);
        res.json(updatedEmployee);
    } catch (error) {
        next(error);
    }
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
        return;
    }
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});