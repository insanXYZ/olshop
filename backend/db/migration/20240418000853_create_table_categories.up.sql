create table categories
(
    id varchar(100) primary key not null ,
    name varchar(100) not null unique ,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    deleted_at timestamp null
) engine = innodb;