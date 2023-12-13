require('dotenv').config()
const inquirer = require('inquirer')
const mysql = require('mysql2')
//Establish connection to the mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2L#RJWFposb66p)UL&w9',
    database: 'employee_db',
})
//Main function that initiates the application
const main = () => {
    //Prompts the user with choices for the CMS
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
        //Process user's choices and invokes corresponding functionality
        const choice = answers.action
        //Handles the logic for view all employees
        if (choice === "View All Employees") {
            //SQL query to get all data from employee table
            connection.query('SELECT * FROM employee', (err, results) => {
                //Error handling
                if (err) {
                    console.error(err)
                    return
                }
                //Shows the table results for employees in the console
                console.table(results)
                //Returns to the main function after the results are displayed
                main()
            })
        }
        //Handles the logic to add employees to the database 
        if (choice === "Add Employees") {
        //Gets all of roles from the database to display as choices
            connection.query('SELECT id, title FROM role', (err, roles) => {
                //Error handling
                if (err) {
                    console.error(err)
                    return
                }
                //Prompts the user to input the new employee details
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
                    //Finds the role ID corresponding to the selected role
                    const role = roles.find(r => r.title === answers.role)
                    //Inserts new employee record into the database
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: role.id
                    }, (err, results) => {
                        //Error handling
                        if (err) {
                            console.error(err)
                            return
                        }
                        //Lets you know the employee has been added
                        console.log('Employee Added!')
                        //Returns to the main function after the emplyee is added
                        main()
                    })
                })
            })
        }
        //Handles the logic for updating employee roles
        if (choice === "Update Employee Role") {
             //Gets all employees to display as choices for selection
            connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
                //Error handling
                if (err) {
                    console.error(err)
                    return
                }
                //Prompts user to select the employee to update
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
                    }
                ]).then(answers => {
                    const selectedEmployeeId = answers.employee
                    //Gets all roles to display as choices for the new role
                    connection.query('SELECT id, title FROM role', (err, roles) => {
                        //Error Handling
                        if (err) {
                            console.error(err)
                            return
                        }
                         //Prompts the user to then select the new role for the selected employee
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select the new role:',
                                choices: roles.map(role => ({ name: role.title, value: role.id }))
                            }
                        ]).then(roleAnswer => {
                            const newRoleId = roleAnswer.role
                            //Updates the employee's role in the database
                            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, selectedEmployeeId], (err, results) => {
                                //Error handling 
                                if (err) {
                                    console.error(err)
                                    return
                                }
                                //Lets you know the employee was updated successfully
                                console.log('Employee\'s role updated!')
                                //Returns to the main function after the employee is updated
                                main()
                            })
                        })
                    })
                })
            })
        }
        //Handles the logic for viewing all roles
        if (choice === "View All Roles") {
            //SQL query to get everything from the role table
            connection.query('SELECT * FROM role ', (err, results) => {
                //Error handling
                if (err) {
                    console.error(err)
                    return
                }
                //Displays the table results in the console
                console.table(results)
                //Returns to the main function after roles are displayed
                main()
            })
        }
        //Handles the logic for adding roles
        if (choice === "Add Role") {
              //Gets all departments to list them as choices for the role's department
            connection.query('SELECT id, department_name FROM department', (err, departments) => {
                if (err) {
                    console.error(err)
                    return
                }
                //Prompts the user to input the new role details
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the new role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for this role?',
                        validate: value => !isNaN(value)
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does this role belong to?',
                        choices: departments.map(dept => ({ name: dept.department_name, value: dept.id }))
                    }
                ]).then(answers => {
                    //Adds the new role to the database
                    connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
                    [answers.title, answers.salary, answers.department], 
                    (err, results) => {
                        //Error Handling
                        if (err) {
                            console.error(err)
                            return
                        }
                        //Tells the  user the new role was added
                        console.log('Role added!')
                        //Returns to the main function adter the new role is added
                        main()
                    })
                })
            })
        }
        //Handles the logic for viewing all departments 
        if (choice === "View All Departments") {
            //SQL query to get everything from the department table
            connection.query('SELECT * FROM department', (err, results) => {
                //Error Handling
                if (err) {
                    console.error(err)
                    return
                }
                //Shows the table results in the console
                console.table(results)
                //Returns to the main function after departments are displayed
                main()
            })
        }
        //Handles logic for adding new departments
        if (choice === "Add Department") {
            //Prompts the user to inpur the new department 
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the new department?'
                }
            ]).then(answers => {
                // Insert new department record into the database
                connection.query('INSERT INTO department SET ?', 
                { department_name: answers.departmentName }, 
                (err, results) => {
                    //Error handling
                    if (err) {
                        console.error(err)
                        return
                    }
                    //Lets the user know a new department is added
                    console.log('New department added!')
                    //Returns to the main function after the new department is added
                    main()
                })
            })
        }
    })
}
//Calls the main function to start the application
main()