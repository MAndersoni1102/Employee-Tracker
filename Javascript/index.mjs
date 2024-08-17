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

//This function handles viewing of departments
function viewAllDepartments() {
    const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    INNER JOIN department ON role.department_id = department.id
    `;
    client.query( query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
}

//This function handles the viewing of roles
function viewRoles() {
    const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    INNER JOIN department ON role.department_id = department.id
    `;
    client.query( query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
}

//This function will handle the viewing of employees
function Viewemployees () {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
           CONCAT(manager.first_name, '', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    `;
    client.query( query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMENU();
    });
}

//This function will handle the adding of departments
function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Please enter a department name:'
    })
    .then( answer => {
        const query = 'INSERT INTO department (name) VALUES ($1)';
        client.query(query, [answer.name], (err, res) => {
            if(err) throw err;
            console.log('Department added: ${answer.name}');
            mainManu();
        });
    });
}
//This function will add Roles
