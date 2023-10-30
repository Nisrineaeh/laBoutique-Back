create table "user"(
id SERIAL primary key,
name varchar(255) not null,
firstname varchar(255) not null,
email varchar(255) unique not null,
password char(60) not null);

create table category(
id SERIAL primary key,
name varchar(255) unique not null);

create table product (
id serial primary key,
name varchar(255) not null,
price decimal(10,2) not null,
quantity int not null,
user_id int references "user"(id) on delete cascade,
category_id int references category(id) on delete cascade);