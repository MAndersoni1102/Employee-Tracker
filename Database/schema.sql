CREATE DATABASE Company;

/c Company;
--This will create a table with the departments at the company
CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name VARCHAR (30) NOT NULL
);
-- This creates a table for the roles of the employees
CREATE TABLE Role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER REFERENCES department(id)
);
--This will create a table of the employees
CREATE TABLE Employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER REFERENCES role(id),
    manager_id INEGER REFERENCES employee(id)
);