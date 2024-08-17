import pg from 'pg';
import inquirer from 'inquirer'
import consoleTable from 'console.table';

const { Client } = pg;

//This will create a connection to the database
const client = new Client({
    host: 'localhost',
    user: 'postgres' ,
    password: 'password',
    database: 'Company',
});

// Connects to the database
client.connect( err => {
    if (err) throw err;
    console.log('Connected to the database.');
    mainMenu();
});

//Menu Functions
function Menu() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Select and option',
        choices: [
            'View all Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update An Employee Role',
            'Quit'
        ]
    })
    .then(answer =>{
      switch(answer.action) {
         case 'View all Departments':
            viewAllDepartments();
            break;
         case 'View Roles':
            viewRoles();
            break;
         case 'View Employees':
            viewEmployees();
            break;
         case 'Add Department':
            addDepartment();
            break;
         case 'Add Role':
            addRole();
            break;
         case 'Add Employee':
            addEmployee();
            break;
         case 'Update An Employee Role':
            updateEmployeeRole;
            break;
         case 'Quit':
            client.end();
            break:         
      }
    });
}
