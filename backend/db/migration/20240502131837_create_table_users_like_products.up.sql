create table user_like_products
(
    user_id varchar(100) not null,
    product_id varchar(100) not null,
    primary key (user_id , product_id),
    foreign key (user_id) references users(id),
    foreign key (product_id) references products(id)
)