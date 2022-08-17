insert into "users"
("username", "hashedPassword")
values ('demouser', '$argon2i$v=19$m=4096,t=3,p=1$IJUuqp89Ott5AB39D7mg7Q$kUQ3bJr5yv5eQaSTRLkrjVciRyjl9Jr8uEgLYkTMgH0');

insert into "tasks" ("title", "status", "notes", "userId")
values ('Test Application', 'In-Progress', 'Make sure demo login is successful', '1'),
       ('Buy new laptop', 'Urgent', 'RAM size must be at least 32GB', '1'),
       ('Practice Algorithms', 'Todo', 'leetcode', '1')
