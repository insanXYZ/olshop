create table image_categories
(
    id varchar(100) not null primary key ,
    name varchar(100) not null,
    category_id varchar(100) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (category_id) references categories (id)
) engine = innodb;