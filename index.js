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

    ])
    .then(answers => {
        const choice = answers.action

        if (choice === "View All Employees") {
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) throw err
                console.error(err)
                console.table(results)
                main()
            })
        }

        if (choice === "View All Roles") {
            connection.query('SELECT * FROM role ', (err, results) => {
                if (err) throw err
                console.error(err)
                console.table(results)
                main()
            })
        }

        if (choice === "View All Departments") {
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) throw err
                console.error(err)
                console.table(results)
                main()
            })
        }
    })
}

main()