create table business(
    businessid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    address varchar(100),
    city varchar(20),
    telephone varchar(20),
    url varchar(200)
);

create table categories(
  categoryid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title varchar(100),
  description varchar(1000)
);
create table biz_categories(
    businessid INT UNSIGNED,
    categoryid INT UNSIGNED,
    foreign key (businessid) references business(businessid),
    foreign key (categoryid) references categories(categoryid)
);