CREATE DATABASE social_network;
USE social_network;

CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100),
 password VARCHAR(100)
);

CREATE TABLE posts (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 content TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;

select * from posts;

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  user_id INT
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  user_id INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
