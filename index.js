require('dotenv').config()
const inquirer = require('inquirer')
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2L#RJWFposb66p)UL&w9',
    database: 'employee_db',
})

const main = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: 
            [
                'View All Employees', 
                'Add Employees', 
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department'
            ]
        }

    ]).then(answers => {
        const choice = answers.action

        if (choice === "View All Employees") {
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.table(results)
                main()
            })
        }

        if (choice === "Add Employees") {
            // First, fetch all roles from the database
            connection.query('SELECT id, title FROM role', (err, roles) => {
                if (err) {
                    console.error(err);
                    return
                }
        
                inquirer.prompt([
                    { 
                        type: 'input', 
                        name: 'firstName',
                        message: "What is the employee's first name?" 
                    },
                    { 
                        type: 'input', 
                        name: 'lastName', 
                        message: "What is the employee's last name?" 
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role?',
                        choices: roles.map(role => role.title)
                    }
                ]).then(answers => {
                    const role = roles.find(r => r.title === answers.role)

                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: role.id
                    }, (err, results) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        console.log('Employee Added!')
                        main()
                    })
                })
            })
        }

        if (choice === "Update Employee Role") {
            connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
                if (err) {
                    console.error(err);
                    return
                }
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
                    }
                ]).then(answers => {
                    const selectedEmployeeId = answers.employee;
                    connection.query('SELECT id, title FROM role', (err, roles) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select the new role:',
                                choices: roles.map(role => ({ name: role.title, value: role.id }))
                            }
                        ]).then(roleAnswer => {
                            const newRoleId = roleAnswer.role
                            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, selectedEmployeeId], (err, results) => {
                                if (err) {
                                    console.error(err)
                                    return; // Stop execution on error
                                }
                                console.log('Employee\'s role updated!')
                                main();
                            })
                        })
                    })
                })
            })
        }

        if (choice === "View All Roles") {
            connection.query('SELECT * FROM role ', (err, results) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.table(results)
                main()
            })
        }

        if (choice === "Add Role") {

        }

        if (choice === "View All Departments") {
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.table(results)
                main()
            })
        }

        if (choice === "Add Department") {

        }
    })
}

main()