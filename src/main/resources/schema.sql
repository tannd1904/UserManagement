DROP TABLE IF EXISTS USER;

CREATE TABLE USER (
      username varchar(255) not null,
      email varchar(255) not null,
      firstname varchar(255) not null,
      lastname varchar(255) not null,
      password varchar(512) not null,
      primary key (username)
);
