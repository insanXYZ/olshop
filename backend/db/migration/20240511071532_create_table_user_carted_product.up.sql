create table user_carted_product
(
    id int primary key auto_increment,
    user_id varchar(100) not null,
    product_id varchar(100) not null,
    qty int not null ,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users(id),
    foreign key (product_id) references products(id)
) engine = innodb;