DROP DATABASE IF EXISTS attendance;

CREATE DATABASE attendance;

USE attendance;

CREATE TABLE students (
  name varchar(100) NOT NULL,
  day DATETIME NOT NULL,
  PRIMARY KEY (name, day)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/
