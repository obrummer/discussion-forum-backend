DROP DATABASE IF EXISTS devskulit;
CREATE DATABASE devskulit;
\connect devskulit;

CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(username)
);

CREATE TABLE thread
(
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
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

INSERT INTO users (username, password) VALUES ('juhani', '$2b$10$u.pfnHvEVWzblrMzwMegpOgrewlWpkH2gyeTAyLC.HGeHWcM47VYG');

INSERT INTO thread (topic, category, user_id) VALUES ('Arrow functions and this..', 'javascript',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Close my closures, understanding JS lexical scope', 'javascript',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Prototype inheritance pain', 'javascript',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Cartesian headache', 'postgresql',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Multiple simultanious sessions error', 'postgresql',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Props and shit have one thing in common: both flow downwards.', 'reactjs',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Stateless functional components', 'reactjs',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('What the hell is package-lock.json?', 'nodejs',  1);
INSERT INTO thread (topic, category, user_id) VALUES ('Node modules are the heaviest thing in the universe', 'nodejs',  1);

INSERT INTO post (content, thread_id, user_id) VALUES ('Until arrow functions, every new function defined its own this value (based on how function was called, a new object in the case of a constructor, undefined in strict mode function calls, the base object if the function is called as an "object method", etc.). This proved to be less than ideal with an object-oriented style of programming.', 1,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Nested functions have access to variables declared in their outer scope.', 2,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.', 3,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 4,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 5,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 6,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 7,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 8,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 9,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 8,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 7,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 6,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 5,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 4,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 3,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 4,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 5,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 6,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 7,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 8,  1);
INSERT INTO post (content, thread_id, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur amet culpa ipsam accusamus beatae corporis nobis impedit. Distinctio minima rem reprehenderit eveniet omnis quae eaque porro corporis necessitatibus natus!', 9,  1);