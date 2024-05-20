create table detail_orders
(
    id varchar(100) primary key not null,
    order_id varchar(100) not null ,
    product_id varchar(100) not null,
    qty int not null,
    total int not null ,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (order_id) references orders (id),
    foreign key (product_id) references products(id)
) engine = innodb;