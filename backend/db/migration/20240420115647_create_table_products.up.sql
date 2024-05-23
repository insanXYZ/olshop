create table products
(
    id varchar(100) primary key not null ,
    name varchar(255) not null,
    price int not null,
    qty int not null,
    description text not null ,
    category_id varchar(100) not null ,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    deleted_at timestamp null,
    foreign key (category_id) references categories(id)
) engine = innodb;
