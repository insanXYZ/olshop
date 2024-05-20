create table orders
(
    id varchar(100) primary key not null ,
    user_id varchar(100) not null ,
    total int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users (id)
) engine = innodb;