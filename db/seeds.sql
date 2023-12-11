USE employee_db;
INSERT INTO department (id, department_name) VALUES 
(id, 'Engineering'),
(id, 'Finance'),
(id, 'Legal'),
(id, 'Sales');

INSERT INTO role (id, title, salary, department_id) VALUES 
(id, 'Sales Lead', 100000, 4),
(id, 'Salesperson', 80000, 4),
(id, 'Lead Engineer', 150000, 1),
(id, 'Software Engineer', 120000, 1),
(id, 'Account Manager', 160000, 2),
(id, 'Accountant', 125000, 2),
(id, 'Legal Team Lead', 250000, 3),
(id, 'Lawyer', 190000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(id, 'John', "Doe", 1, NULL),
(id, 'Mike', "Chan", 2, 1),
(id, 'Ashley', "Rodriguez", 3, NULL),
(id, 'Kevin', "Tupik", 4, 3),
(id, 'Kunal', "Singh", 5, NULL),
(id, 'Malia', "Brown", 6, 5),
(id, 'Sarah', "Lourd", 7, NULL),
(id, 'Tom', "Allen", 8, 7);
