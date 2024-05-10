create table image_products
(
    id int primary key auto_increment,
    name text not null,
    product_id varchar(100) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (product_id) references products(id)
) engine = innodb;