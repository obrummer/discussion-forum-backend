DROP DATABASE IF EXISTS discussion;
CREATE DATABASE discussion;
\connect discussion;

CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(username)
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    UNIQUE(name)
);

CREATE TABLE thread
(
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post 
(
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    thread_id INTEGER REFERENCES thread(id),    
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('McTestFace', 'testpassword');

INSERT INTO categories (name) VALUES ('JavaScript');
INSERT INTO categories (name) VALUES ('React');
INSERT INTO categories (name) VALUES ('Angular');
INSERT INTO categories (name) VALUES ('AWS');

INSERT INTO thread (topic, category_id, user_id) VALUES ('Arrow functions and this..', 1,  1);
INSERT INTO thread (topic, category_id, user_id) VALUES ('Understanding hooks, hookedy-dooks', 2,  1);
INSERT INTO thread (topic, category_id, user_id) VALUES ('AWS Serverless technologies', 4,  1);

\quit