create table users(
    id varchar(100) primary key not null ,
    role enum('admin','member') not null,
    name varchar(100) not null,
    image varchar(100) not null,
    email varchar(100) not null ,
    password varchar(100) not null ,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);