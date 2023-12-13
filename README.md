# Employee Tracker

## Description

Employee Tracker is a command-line application to manage a company's employee database. It allows users to view and interact with information regarding employees, roles, and departments within a company. This tool is built using Node.js, Inquirer, and MySQL.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Ensure that you have Node.js and MySQL installed on your system. After cloning the repository, 
install the necessary dependencies by running the following command:

```
npm install
```

run the following to set up the database:

```
mysql -u root -p
[Enter your MySQL password]
source db/schema.sql;
source db/seeds.sql;
```

## Usage

To start the application, run:

```
node index.js
```

Follow the on-screen prompts to view, add or update employees, roles, and departments.

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles

## Contributing
Contributions to improve Employee Tracker are welcome. Please ensure your pull requests are well-documented.

## Tests
There are currently no automated tests for this application. You can manually test the application by running it and inputting test data.

## Questions
For any questions regarding the application, please open an issue or contact me directly at thebigboognish@gmail.com.
