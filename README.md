# Kanban-List :memo:

A full stack JavaScript solo project.
A web application for organizers who want to keep their tasks organized.

## Description
I use notepad to write down daily tasks, weekly todos, or urgent tasks so that I don't forget.

I thought that why don't I just create an application that creates a task, edit, and delete when the task is complete?

So I proudly present Kanban-List! :smile:

* Live demo can be watched here! :point_right: https://youtu.be/H2VXj_vv9Vk
* Live demo for creating a new user: 👉 https://youtu.be/KrSx8K_MwDQ


## Technologies used

![image](https://user-images.githubusercontent.com/96744088/185199905-96d095cd-fb35-4816-bcf2-49471023dcee.png)
![image](https://user-images.githubusercontent.com/96744088/185199847-4a5516f5-1e63-4c38-b914-a87515eb098a.png)
![image](https://user-images.githubusercontent.com/96744088/185200132-6174e088-dab1-4e82-989e-914bdd6b55de.png)
![image](https://user-images.githubusercontent.com/96744088/185200149-7e796535-ccff-4a9a-9c9a-e1641b560106.png)
![image](https://user-images.githubusercontent.com/96744088/185200163-475211a9-9b6c-40b2-b802-4e15405c1ead.png)
![image](https://user-images.githubusercontent.com/96744088/185200178-d731c662-c630-4879-80aa-3af8cb5d4715.png)
![image](https://user-images.githubusercontent.com/96744088/185200190-9c6bb110-8424-4577-9ae0-feb3b0d2b058.png)
![image](https://user-images.githubusercontent.com/96744088/185200207-83c1eacc-551c-48e7-85c9-4a0841e9df22.png)
![image](https://user-images.githubusercontent.com/96744088/185200223-2ca8d16a-cce0-4ac1-bf44-fa93724452fb.png)
![image](https://user-images.githubusercontent.com/96744088/185200241-16a4c172-01fa-491f-9417-bf23c4fd65b7.png)
![image](https://user-images.githubusercontent.com/96744088/185200259-6659b626-61a8-4788-8701-932857acec9e.png)
![image](https://user-images.githubusercontent.com/96744088/185200277-75a74235-05ed-4b36-9835-8af39a25500d.png)
![image](https://user-images.githubusercontent.com/96744088/185200293-bff78f17-8b68-4e65-8468-b09e1e74dfd1.png)
![image](https://user-images.githubusercontent.com/96744088/185201886-ccdb0b7a-214a-493d-b8be-4dcd20e1e42a.png)
![image](https://user-images.githubusercontent.com/96744088/185201183-b235f7ad-da62-430c-8a54-399e82696f83.png)
![image](https://user-images.githubusercontent.com/96744088/185201225-089fe5d4-61c2-48d3-af80-8198cd4d5847.png)
![image](https://user-images.githubusercontent.com/96744088/185201295-8891fe32-3b50-4d6b-91a9-70d8929d80db.png)

## Features Implemented
* User can create a task
* user can view a task
* User can edit a task
* User can delete a task
* User can sign up for an account
* User can sign in
* User can sign out

## Major features:

Create a task feature :point_down:

![final-project-feature3-create-task](https://user-images.githubusercontent.com/96744088/185204524-9c799c31-cfac-4092-9492-80d76626f086.gif)


Edit task feature :point_down:

![final-project-feature5-update-task](https://user-images.githubusercontent.com/96744088/185204394-d3aa57be-09ef-42ef-a91a-652b72227a1b.gif)

## Stretch feature to implement
* User can sort task by its status

## System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* PostgreSQL 12.9 or higher

## Getting started

1. Clone the repository.
  ```
  git clone git@github.com:m-Cho1/final-project.git
  cd kanbanList
  ```
2. Install all dependencies with NPM.
  ```
  npm install
  ```
3. Make a copy of the .env.example file and name it .env
  ```
  cp .env.example .env
  ```
4. Create database
  ```
  createdb nameOfDatabase
  ```
5. Import the example database.
  ```
  npm run db:import
  ```
6. Start the postgreSQL database server
  ```
  sudo service postgresql start
  ```
7. Launch pgweb postgreSQL database in the separate terminal
  ```
  pgweb --db=myDatabase
  ```
  You can view database by opening http://localhost:8081 on your default browser.
  
8. Start the project
  ```
  npm run dev
  ```
9. Once started server, you can view the application by opening http://localhost:3000 in your browser
