DROP DATABASE IF EXISTS attendance;

CREATE DATABASE attendance;

USE attendance;

CREATE TABLE students (
  name varchar(100) NOT NULL,
  day DATETIME NOT NULL,
  PRIMARY KEY (name, day)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  day TIME NOT NULL,
  message TEXT NOT NULL,
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/
