insert into "users"
("username", "hashedPassword")
values ('testUser', 'asdf');

insert into "tasks" ("title", "status", "notes", "userId")
values ('test title', 'todo', 'test notes typed', '1'),
       ('another title', 'in-progress', 'another notes', '1'),
       ('title3', 'urgent', 'notes3', '1')
